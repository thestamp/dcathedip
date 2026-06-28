const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '_site');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function createServer() {
  return http.createServer((req, res) => {
    const requested = new URL(req.url, 'http://localhost').pathname;
    const safePath = path.normalize(requested).replace(/^\/+/, '');
    let filePath = path.join(root, safePath || 'index.html');
    if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  });
}

(async () => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.locator('#calculator').scrollIntoViewIfNeeded();
    await page.evaluate(() => clearMarketMoves());
    await page.locator('#growth').fill('0');
    await page.locator('#variation').fill('0');
    const zeroCaseEqual = await page.evaluate(() => {
      const result = simulate();
      const annualTotal = +document.getElementById('recurring').value * 5 * 52;
      const rows = [...document.querySelectorAll('#dailyTable tbody tr')];
      const finalCells = [...rows.at(-1).querySelectorAll('td')].map(cell => cell.textContent.trim());
      return Math.abs(result.lumpEnd - annualTotal) < 0.01
        && result.schedules.every(schedule => Math.abs(schedule.end - annualTotal) < 0.01)
        && document.getElementById('capitalOut').value.includes('2,600')
        && rows.length === 366
        && finalCells.every(value => value === '$2,600');
    });
    const dailyComparisonTable = await page.evaluate(() => {
      const details = document.querySelector('.daily-comparison');
      const collapsedByDefault = !details.open;
      details.open = true;
      const headers = [...document.querySelectorAll('#dailyTable thead th')].map(th => th.textContent.trim());
      const wrapper = document.querySelector('.daily-table-wrap');
      const before = document.querySelector('#dailyTable tbody tr:nth-child(11) td:nth-child(2)').textContent.trim();
      document.getElementById('dipStart').value = 2;
      document.getElementById('dipHeight').value = -25;
      document.getElementById('dipWidth').value = 8;
      document.getElementById('dipRecover').checked = true;
      document.getElementById('addDip').click();
      const after = document.querySelector('#dailyTable tbody tr:nth-child(11) td:nth-child(2)').textContent.trim();
      const firstColumnWidth = document.querySelector('#dailyTable thead th:first-child').getBoundingClientRect().width;
      return {
        collapsedByDefault,
        hasExpectedHeaders: ['Day', 'Lump sum', 'Daily', 'Weekly', 'Monthly', 'Quarterly'].every(header => headers.includes(header)) && !headers.includes('Annual'),
        scrollable: wrapper.scrollHeight > wrapper.clientHeight,
        fitsFrame: wrapper.scrollWidth <= wrapper.clientWidth + 1 && firstColumnWidth <= 60,
        updatesOnSlider: before !== after
      };
    });
    const chartMoveEditor = await page.evaluate(() => {
      clearMarketMoves();
      document.getElementById('variation').value = 0;
      document.getElementById('growth').value = 10;
      updateChart();
      const noMoves = buildPrices();
      document.getElementById('dipStart').value = 100;
      document.getElementById('dipHeight').value = -30;
      document.getElementById('dipWidth').value = 10;
      document.getElementById('dipRecover').checked = false;
      document.getElementById('addDip').click();
      const unrecoveredDip = buildPrices();
      const listedMove = document.querySelector('#dipList').textContent;
      const removeButton = document.querySelector('[data-remove-move]');
      removeButton.click();
      const removed = marketMoves.length === 0;
      const body = document.body.textContent;
      const height = document.getElementById('dipHeight');
      const width = document.getElementById('dipWidth');
      return {
        editorVisible: Boolean(document.querySelector('#dipEditor')),
        noStaticSliders: !document.getElementById('earlyDip') && !document.getElementById('midDip') && !document.getElementById('lateDip'),
        ranges: height.min === '-30' && height.max === '30' && width.min === '1' && width.max === '365',
        canAddUnrecoveredMove: marketMoves.length === 1 || /does not recover/i.test(listedMove),
        unrecoveredAffectsEnd: unrecoveredDip.at(-1) < noMoves.at(-1),
        canRemoveMove: removed,
        wholeYearGrowth: noMoves[182] > 100 && Math.abs(noMoves.at(-1) - 110) < 0.01,
        noAnnualDca: !/Annual DCA/i.test(body)
      };
    });
    const dailyVariationControl = await page.evaluate(() => {
      clearMarketMoves();
      document.getElementById('growth').value = 10;
      document.getElementById('variation').value = 0;
      updateChart();
      const noVariation = buildPrices();
      document.getElementById('variation').value = 3;
      updateChart();
      const withVariation = buildPrices();
      const variation = document.getElementById('variation');
      const statsCols = getComputedStyle(document.querySelector('.stats')).gridTemplateColumns.split(' ').length;
      return {
        range: variation.min === '0' && variation.max === '3',
        changesPath: Math.abs(noVariation[100] - withVariation[100]) > 0.01,
        preservesAnnualEnd: Math.abs(withVariation.at(-1) - 110) < 0.01,
        statGridThreeColumns: statsCols === 3
      };
    });
    await page.evaluate(() => clearMarketMoves());
    await page.locator('#growth').fill('0');
    await page.locator('#variation').fill('0');
    await page.locator('[data-region="us"]').click();
    await page.locator('#tfsa').scrollIntoViewIfNeeded();
    await page.locator('#eligibilityYear').fill('2011');
    await page.locator('#tfsaContributed').fill('25000');
    await page.locator('#tfsaWithdrawals').fill('5000');
    const dayZeroInvested = await page.evaluate(() => {
      const result = simulate();
      return result.lumpValues[0] > 0 && result.schedules.every(schedule => schedule.values[0] > 0);
    });
    const layoutChecks = await page.evaluate(() => {
      const budgetGrid = document.querySelector('.budget-grid');
      const budgetCols = getComputedStyle(budgetGrid).gridTemplateColumns.split(' ').length;
      const meansRect = document.querySelector('#means').getBoundingClientRect();
      const longPromoCta = [...document.querySelectorAll('.wealthsimple-promo-actions .button')]
        .some(button => button.textContent.trim().length > 25);
      const externalLogoImage = Boolean(document.querySelector('.wealthsimple-logo-lockup img'));
      return {
        budgetTwoColumns: budgetCols === 2,
        meansFullWidth: Math.abs(meansRect.left) < 2 && Math.abs(meansRect.width - window.innerWidth) < 2,
        shortPromoCtas: !longPromoCta,
        noExternalLogoImage: !externalLogoImage
      };
    });
    const vtVisible = await page.locator('text=VT').first().isVisible();
    await page.locator('[data-region="canada"]').click();
    const canadaEtfGrid = await page.evaluate(() => {
      const grid = document.querySelector('#tickerGrid');
      const text = grid.textContent;
      return grid.classList.contains('etf-matrix')
        && /Cap-based/i.test(text)
        && /Growth-based/i.test(text)
        && /ZSP\.TO/i.test(text)
        && /CAUS\.TO/i.test(text)
        && /ZIU\.TO/i.test(text)
        && /CACE\.TO/i.test(text)
        && /XEQT\.TO/i.test(text)
        && /CAGE\.TO/i.test(text);
    });
    const tfsaVisible = await page.locator('text=Estimated room remaining').first().isVisible();
    const taxFreeCopy = await page.locator('text=tax-free').first().isVisible();
    const bodyText = await page.locator('body').textContent();
    const eligibilityCopy = /Eligibility year/i.test(bodyText) && /later of the year you turned 18/i.test(bodyText) && /became a Canadian resident/i.test(bodyText);
    const marginCopy = /\bmargin\b/i.test(bodyText);
    const recurringTip = /recurring investments/i.test(bodyText) && /\$1 a day/i.test(bodyText);
    const wealthsimplePromo = /Automate investing instead of gambling on the odds/i.test(bodyText) && /right from your bank account/i.test(bodyText);
    const canadaBoxNoGuide = await page.locator('#wealthsimpleBox a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count === 0);
    const unitsRule = /More units on down days/i.test(bodyText) && /future compounding/i.test(bodyText);
    const lumpSumFaq = /large amount to invest/i.test(bodyText) && /\$10,000 lump sum/i.test(bodyText) && /\$500 per trading day/i.test(bodyText);
    const timingSection = /Why not just buy the dip\?/i.test(bodyText) && /more than eight out of ten day traders lose money/i.test(bodyText);
    const riskChart = /Easier psychologically/i.test(bodyText) && /Builds a habit/i.test(bodyText) && /Small, regular amounts/i.test(bodyText) && /Large one-time sum/i.test(bodyText) && /Paycheque investors building a habit/i.test(bodyText);
    const lumpSumRiskFaq = /RBC GAM research/i.test(bodyText) && /emotions do/i.test(bodyText) && /behavioral choice/i.test(bodyText);
    const budgetSection = /How much should I DCA\?/i.test(bodyText) && /budget sustainably/i.test(bodyText) && /\$5 coffee each day is \$25 a week/i.test(bodyText) && /\$1,200 a year/i.test(bodyText) && /\$5 weekly lottery ticket is \$260 a year/i.test(bodyText);
    const meansSection = /Invest within your means/i.test(bodyText) && /Do not risk what you cannot afford/i.test(bodyText) && /Build your safety net first/i.test(bodyText) && /3–6 months of living expenses/i.test(bodyText) && /Invest only what is extra/i.test(bodyText);
    const withdrawFaq = /When is the best time to withdraw\?/i.test(bodyText) && /vacation/i.test(bodyText) && /new car/i.test(bodyText) && /withdraw only when you actually need the cash/i.test(bodyText);
    const withdrawSection = /When the money has a job to do/i.test(bodyText) && /panic selling/i.test(bodyText) && /A real goal/i.test(bodyText) && /During emergencies/i.test(bodyText) && /Not market reaction/i.test(bodyText);
    const broadEtfSection = /Broad index ETFs beat concentrated bets/i.test(bodyText)
      && /broad-market ETFs/i.test(bodyText)
      && /Industry ETFs/i.test(bodyText)
      && /Individual stocks/i.test(bodyText)
      && /company-specific risk/i.test(bodyText);
    const wealthsimpleGuide = /Wealthsimple step-by-step/i.test(bodyText)
      && /Set up your Wealthsimple profile/i.test(bodyText)
      && /Open a Cash account \(optional\)/i.test(bodyText)
      && /TFSA trading account/i.test(bodyText)
      && /Set up a recurring investment/i.test(bodyText);
    const referralPromo = /extra .25 when you make your first deposit/i.test(bodyText)
      && /Sign up with referral/i.test(bodyText);
    const stepByStepNav = await page.locator('.nav-links a[href="#wealthsimple-guide"]').count().then(count => count === 1);
    const etfToStepsLink = await page.locator('a[href="#wealthsimple-guide"]').count().then(count => count >= 2);
    const removedDailyFaq = !/Is daily DCA always better than lump sum\?/i.test(bodyText);
    const removedDailyMonthlyFaq = !/Why recommend daily instead of monthly\?/i.test(bodyText);
    const faqReferral = await page.locator('#faq a[href="https://wealthsimple.com/invite/V-MKNQ"]').count().then(count => count === 1);
    const recurringGuide = await page.locator('a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count >= 2);
    const timingSources = await page.locator('#timing a[href*="barber-lee-liu-odean.pdf"], #timing a[href*="rbcgam.com"]').count();
    const statCards = await page.locator('.stat').count();
    const chartCanvas = await page.locator('#dcaChart').isVisible();
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    if (!zeroCaseEqual) throw new Error('Expected 0% dip and 0% annual gain to make all DCA schedules equal the one-time annual investment and final table row.');
    if (!dailyComparisonTable.collapsedByDefault) throw new Error('Expected day-by-day comparison table to be collapsed by default.');
    if (!dailyComparisonTable.hasExpectedHeaders) throw new Error('Expected day-by-day comparison table headers for lump, daily, weekly, monthly, and quarterly only.');
    if (!dailyComparisonTable.scrollable) throw new Error('Expected day-by-day comparison table to be scrollable.');
    if (!dailyComparisonTable.fitsFrame) throw new Error('Expected day-by-day comparison table to fit inside its frame with a narrow Day column.');
    if (!dailyComparisonTable.updatesOnSlider) throw new Error('Expected day-by-day comparison table to update when sliders change.');
    if (!chartMoveEditor.editorVisible) throw new Error('Expected chart to include a market move editor.');
    if (!chartMoveEditor.noStaticSliders) throw new Error('Expected three static market move sliders to be removed.');
    if (!chartMoveEditor.ranges) throw new Error('Expected market move editor height to range -30% to +30% and width to range 1 to 365 days.');
    if (!chartMoveEditor.canAddUnrecoveredMove) throw new Error('Expected market move editor to add an unrecovered move.');
    if (!chartMoveEditor.unrecoveredAffectsEnd) throw new Error('Expected unrecovered market move to affect the year-end path.');
    if (!chartMoveEditor.canRemoveMove) throw new Error('Expected market move editor rows to be removable.');
    if (!chartMoveEditor.wholeYearGrowth) throw new Error('Expected annualized gain/loss to compound across the whole year.');
    if (!chartMoveEditor.noAnnualDca) throw new Error('Expected Annual DCA series/stat/table column to be removed.');
    if (!dailyVariationControl.range) throw new Error('Expected daily variation slider to range from 0% to 3%.');
    if (!dailyVariationControl.changesPath) throw new Error('Expected daily variation to add daily up/down movement to the price path.');
    if (!dailyVariationControl.preservesAnnualEnd) throw new Error('Expected daily variation to preserve the annualized end value.');
    if (!dailyVariationControl.statGridThreeColumns) throw new Error('Expected chart stat boxes to use a clean three-column desktop layout.');
    if (!vtVisible) throw new Error('Expected U.S. ETF ticker VT to be visible after selecting U.S. region.');
    if (!canadaEtfGrid) throw new Error('Expected Canadian ETF matrix with cap-based and growth-based choices for U.S., Canada, and World.');
    if (!dayZeroInvested) throw new Error('Expected all modeled strategies to make their first contribution on day 0.');
    if (!layoutChecks.budgetTwoColumns) throw new Error('Expected budget cards to use a balanced two-column desktop layout.');
    if (!layoutChecks.meansFullWidth) throw new Error('Expected invest-within-your-means section separator/background to span full viewport width.');
    if (!layoutChecks.shortPromoCtas) throw new Error('Expected Wealthsimple promo CTA labels to be short enough for clean layout.');
    if (!layoutChecks.noExternalLogoImage) throw new Error('Expected Wealthsimple brand cue to avoid a broken external logo image.');
    if (!tfsaVisible) throw new Error('Expected TFSA estimated room output to be visible.');
    if (!taxFreeCopy) throw new Error('Expected TFSA tax-free copy to be visible.');
    if (!eligibilityCopy) throw new Error('Expected TFSA calculator eligibility-year explanation.');
    if (!recurringTip) throw new Error('Expected Wealthsimple recurring investment tip with $1/day copy.');
    if (!wealthsimplePromo) throw new Error('Expected dedicated Wealthsimple automation promo box with bank-account setup copy.');
    if (!canadaBoxNoGuide) throw new Error('Expected Canadian investors brokerage callout to omit the recurring investing guide link.');
    if (!recurringGuide) throw new Error('Expected Wealthsimple recurring investment guide link.');
    if (!unitsRule) throw new Error('Expected top simple rule to mention units and future compounding.');
    if (!lumpSumFaq) throw new Error('Expected FAQ for deploying a large lump sum with $10,000 / $500 per trading day example.');
    if (!timingSection) throw new Error('Expected why-not-buy-the-dip timing section with day-trading loss statistic.');
    if (!riskChart) throw new Error('Expected lump sum versus DCA timing risk chart.');
    if (!lumpSumRiskFaq) throw new Error('Expected RBC GAM research note with emotions/behavioral-choice language.');
    if (!budgetSection) throw new Error('Expected sustainable DCA amount section with coffee and lottery examples.');
    if (!meansSection) throw new Error('Expected invest-within-your-means section with safety net guidance.');
    if (!broadEtfSection) throw new Error('Expected broad index ETF safety section comparing broad ETFs, industry ETFs, and individual stocks.');
    if (!wealthsimpleGuide) throw new Error('Expected Wealthsimple step-by-step guide with four numbered steps.');
    if (!referralPromo) throw new Error('Expected referral promo box with extra $25 language.');
    if (!stepByStepNav) throw new Error('Expected nav menu to include a Step-by-step link pointing to the Wealthsimple guide section.');
    if (!etfToStepsLink) throw new Error('Expected at least 2 links from ETF section back to step-by-step guide (step 4 link + back link).');
    if (!withdrawSection) throw new Error('Expected when-to-withdraw section with panic selling warning and three pillars.');
    if (!removedDailyFaq) throw new Error('Expected "Is daily DCA always better than lump sum?" FAQ to be removed.');
    if (!removedDailyMonthlyFaq) throw new Error('Expected "Why recommend daily instead of monthly?" FAQ to be removed.');
    if (!faqReferral) throw new Error('Expected Wealthsimple referral link inside the lump sum FAQ.');
    if (timingSources !== 2) throw new Error(`Expected 2 cited source links in timing section, found ${timingSources}.`);
    if (marginCopy) throw new Error('The page should not contain margin copy.');
    if (statCards < 9) throw new Error(`Expected at least 9 stat cards including TFSA results, found ${statCards}.`);
    if (!chartCanvas) throw new Error('Expected DCA chart canvas to be visible.');
    console.log(JSON.stringify({ ok: true, zeroCaseEqual, dailyComparisonTable, chartMoveEditor, dailyVariationControl, dayZeroInvested, layoutChecks, vtVisible, canadaEtfGrid, tfsaVisible, taxFreeCopy, eligibilityCopy, recurringTip, wealthsimplePromo, canadaBoxNoGuide, recurringGuide, unitsRule, lumpSumFaq, timingSection, riskChart, lumpSumRiskFaq, budgetSection, meansSection, broadEtfSection, wealthsimpleGuide, referralPromo, stepByStepNav, etfToStepsLink, withdrawSection, removedDailyFaq, removedDailyMonthlyFaq, faqReferral, statCards, chartCanvas }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
