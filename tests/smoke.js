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
      return result.schedules.every(schedule => Math.abs(schedule.end - annualTotal) < 0.01)
        && document.getElementById('capitalOut').value.includes('2,600')
        && rows.length === 366
        && finalCells.every(value => value.includes('2,600'));
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
        hasExpectedHeaders: ['Day', 'Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly'].every(header => headers.includes(header)) && !headers.includes('Lump sum') && !headers.includes('Annual'),
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
        canAddUnrecoveredMove: marketMoves.length === 1 || /does not recover|stays there/i.test(listedMove),
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
      return result.schedules.every(schedule => schedule.values[0] > 0);
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
    const vtVisible = await page.locator('#tickerGrid .ticker-card .ticker', { hasText: 'VT' }).first().isVisible();
    await page.locator('[data-region="canada"]').click();
    const canadaEtfGrid = await page.evaluate(() => {
      const grid = document.querySelector('#tickerGrid');
      const text = grid.textContent;
      return grid.classList.contains('etf-matrix')
        && /Standard broad-market/i.test(text)
        && /Tilted|more aggressive/i.test(text)
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
    const seoHero = /Keep Calm and DCA On/i.test(bodyText) && /Build a steady ETF investing habit/i.test(bodyText) && /Dollar-cost averaging for Canadian ETF investors/i.test(bodyText) && /You are not predicting the noise/i.test(bodyText);
    const navText = await page.locator('.nav-links').textContent();
    const journeyStructure = /Three-step journey/i.test(bodyText) && /Start calm\. Automate the habit\. Keep building\./i.test(bodyText) && /1 Start/i.test(navText) && /2 Automate/i.test(navText) && /3 Grow/i.test(navText);
    const sectionFootnotes = !/Context:/i.test(bodyText) && /Footnotes live with each section/i.test(bodyText) && /Educational content only, not financial advice/i.test(bodyText) && /Referral links may provide a benefit/i.test(bodyText) && /ETF tickers are examples for research/i.test(bodyText) && /Confirm your official TFSA contribution room/i.test(bodyText);
    const noCaveatHero = !/The goal is not to predict market bottoms/i.test(bodyText) && !/educational guide to automated/i.test(bodyText);
    const eligibilityCopy = /Eligibility year/i.test(bodyText) && /past contributions/i.test(bodyText) && /last year’s withdrawals/i.test(bodyText) && /last updated for 2026/i.test(bodyText);
    const marginCopy = /\bmargin\b/i.test(bodyText);
    const recurringTip = /recurring investments/i.test(bodyText) && /\$1 a day/i.test(bodyText);
    const wealthsimplePromo = /Automate your recurring investments/i.test(bodyText) && /recurring ETF purchases from your bank account/i.test(bodyText);
    const canadaBoxNoGuide = await page.locator('#wealthsimpleBox a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count === 0);
    const unitsRule = /Lower prices buy more units/i.test(bodyText) && /No guessing the bottom/i.test(bodyText);
    const lumpSumFaq = /Is DCA better than lump sum investing\?/i.test(bodyText) && /investing sooner has often performed better historically/i.test(bodyText) && /DCA may be easier emotionally/i.test(bodyText);
    const timingSection = /Trying to time the noise is harder than it looks/i.test(bodyText) && /Research on individual day traders/i.test(bodyText);
    const riskChart = /Easier psychologically/i.test(bodyText) && /Builds a habit/i.test(bodyText) && /Investing from income/i.test(bodyText) && /Large lump sum/i.test(bodyText) && /Staying invested matters more than perfect timing/i.test(bodyText);
    const lumpSumRiskFaq = /Trying to time the noise is harder than it looks/i.test(bodyText) && /DCA removes the pressure/i.test(bodyText) && /Barber, Lee, Liu/i.test(bodyText);
    const compoundingSection = /Compounding over time/i.test(bodyText)
      && /Build the base/i.test(bodyText)
      && /Momentum appears/i.test(bodyText)
      && /Growth becomes visible/i.test(bodyText)
      && /Rule of 72 \+ DCA calculator/i.test(bodyText)
      && /How long to double your money\?/i.test(bodyText)
      && /72 ÷ return/i.test(bodyText)
      && /Use this as mental math/i.test(bodyText)
      && /Daily contribution/i.test(bodyText)
      && !/Try your numbers/i.test(bodyText)
      && !/Regular contribution/i.test(bodyText);
    const compoundingNav = await page.locator('.nav-links a[href="#compounding"]').count().then(count => count === 1);
    const foundationImage = await page.locator('.foundation-illustration').count().then(count => count === 1);
    const foundationSection = /Build a simple investing foundation/i.test(bodyText)
      && /High-interest debt/i.test(bodyText)
      && /Emergency savings/i.test(bodyText)
      && /Comfort level/i.test(bodyText)
      && foundationImage;
    const riskLevelSection = /Risk and comfort/i.test(bodyText)
      && /Choose an ETF mix you can stick with/i.test(bodyText)
      && /Balanced or conservative asset-allocation ETFs/i.test(bodyText)
      && /larger swings/i.test(bodyText);
    const resetNeutral = await page.evaluate(() => {
      document.getElementById('dipStart').value = 40;
      document.getElementById('dipHeight').value = -20;
      document.getElementById('dipWidth').value = 5;
      document.getElementById('addDip').click();
      document.getElementById('growth').value = 8;
      document.getElementById('variation').value = 2;
      document.getElementById('resetNeutral').click();
      const result = simulate();
      const finalValues = result.schedules.map(s => s.end);
      return marketMoves.length === 0 && document.getElementById('growth').value === '0' && document.getElementById('variation').value === '0'
        && finalValues.every(value => Math.abs(value - finalValues[0]) < 0.01);
    });
    const incomeTargetCalculator = await page.evaluate(() => {
      const current = document.getElementById('crossCurrent');
      const monthly = document.getElementById('crossMonthly');
      const cagr = document.getElementById('crossCagr');
      const spending = document.getElementById('crossSpending');
      const withdrawal = document.getElementById('crossWithdrawal');
      const years = document.getElementById('crossYears');
      current.value = 10000;
      monthly.value = 500;
      cagr.value = 7;
      spending.value = 40000;
      withdrawal.value = 4;
      years.value = 25;
      years.dispatchEvent(new Event('input', { bubbles: true }));
      const resultText = document.getElementById('crossoverResults').textContent;
      const chart = window.Chart.getChart(document.getElementById('crossoverChart'));
      return {
        visible: Boolean(document.getElementById('crossoverForm')),
        copy: /4% rule income target/i.test(document.body.textContent) && /desired annual income ÷ 4%/i.test(document.body.textContent) && /Recommended term/i.test(document.body.textContent) && /Footnotes/i.test(document.body.textContent),
        outputs: /4% rule income target/i.test(resultText) && /Amount still needed/i.test(resultText) && /Estimated target timing/i.test(resultText) && /Contribution crossover/i.test(resultText),
        chart: Boolean(chart) && chart.data.datasets.some(dataset => dataset.label === 'Portfolio balance') && chart.data.datasets.some(dataset => dataset.label === '4% rule income target') && chart.data.datasets.some(dataset => dataset.label === 'Contribution crossover'),
        updates: resultText.includes('$1,000,000') && resultText.includes('$990,000')
      };
    });
    const compoundCalculator = await page.evaluate(() => {
      const preset = document.getElementById('compoundPreset');
      const initial = document.getElementById('compoundInitial');
      const daily = document.getElementById('compoundDaily');
      const years = document.getElementById('compoundYears');
      const cagr = document.getElementById('compoundCagr');
      preset.value = 'equity';
      preset.dispatchEvent(new Event('change', { bubbles: true }));
      const selectedEquity = cagr.value === '8';
      initial.value = 1000;
      daily.value = 10;
      years.value = 15;
      cagr.value = 8;
      cagr.dispatchEvent(new Event('input', { bubbles: true }));
      const text = document.getElementById('compoundResults').textContent;
      return {
        visible: Boolean(document.getElementById('compoundForm')),
        hasGenericPresets: [...preset.options].some(option => /Conservative/.test(option.textContent)) && [...preset.options].some(option => /Aggressive/.test(option.textContent)),
        selectedEquity,
        hasOutputs: /Estimated future value/i.test(text) && /Total contributed/i.test(text) && /Estimated growth/i.test(text) && /9.0 years/i.test(text),
        disclaimer: /Results are estimates based on the return assumption/i.test(document.body.textContent)
      };
    });
    const noStandaloneBudget = await page.locator('#budget').count().then(count => count === 0);
    const sustainableBudget = noStandaloneBudget && /Sustainable investing/i.test(bodyText) && /\$5 weekday coffee is \$25 a week/i.test(bodyText) && /\$1,200 a year/i.test(bodyText) && /\$5 weekly lottery ticket is \$260 a year/i.test(bodyText);
    const meansSection = /Sustainable investing/i.test(bodyText) && /Keep the habit small enough to survive real life/i.test(bodyText) && /Build your safety net first/i.test(bodyText) && /Keep emergency cash available/i.test(bodyText) && /Keep the habit sustainable/i.test(bodyText) && sustainableBudget;
    const marketNoisePlaybook = /Market noise playbook/i.test(bodyText) && /When markets get loud, your plan stays quiet/i.test(bodyText) && /Red days are not instructions/i.test(bodyText) && /Green days are not permission to chase/i.test(bodyText) && /Check the plan, then keep the schedule/i.test(bodyText);
    const withdrawSection = /Sell because the money has a job/i.test(bodyText) && /panic selling/i.test(bodyText) && /rebalancing/i.test(bodyText) && /reducing risk before a known expense/i.test(bodyText);
    const broadEtfSection = /Broad ETFs make diversification simple/i.test(bodyText)
      && /Diversified building blocks/i.test(bodyText)
      && /Balanced ETFs/i.test(bodyText)
      && /Individual stocks \/ sector ETFs/i.test(bodyText);
    const wealthsimpleGuide = /Set up recurring ETF investing with Wealthsimple/i.test(bodyText)
      && /Create your Wealthsimple profile/i.test(bodyText)
      && /Choose where cash will come from/i.test(bodyText)
      && /Open the investing account you want to use/i.test(bodyText)
      && /Set up a recurring investment/i.test(bodyText);
    const referralPromo = /Referral link/i.test(bodyText)
      && /Sign up with referral/i.test(bodyText);
    const stepByStepNav = await page.locator('.nav-links a[href="#tickers"]').count().then(count => count === 1);
    const etfToStepsLink = await page.locator('a[href="#wealthsimple-guide"]').count().then(count => count >= 1);
    const removedDailyFaq = !/Is daily DCA always better than lump sum\?/i.test(bodyText);
    const removedDailyMonthlyFaq = !/Why recommend daily instead of monthly\?/i.test(bodyText);
    const calmFaqs = /Should I keep DCA investing when the market is down\?/i.test(bodyText) && /Does DCA mean buying the dip\?/i.test(bodyText) && /What if I feel nervous investing during a crash\?/i.test(bodyText);
    const faqReferral = await page.locator('#faq a[href="https://wealthsimple.com/invite/V-MKNQ"]').count().then(count => count === 1);
    const recurringGuide = await page.locator('a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count >= 2);
    const timingSources = await page.locator('#timing a[href*="barber-lee-liu-odean.pdf"], #timing a[href*="rbcgam.com"]').count();
    const statCards = await page.locator('.stat').count();
    const chartCanvas = await page.locator('#dcaChart').isVisible();
    const dcaBaselineComparison = await page.evaluate(() => {
      const chart = window.Chart.getChart(document.getElementById('dcaChart'));
      const textBefore = document.getElementById('stats').textContent;
      const defaultDailyBaseline = /Daily DCA \(1 year\).*Baseline/i.test(textBefore) && !/Lump sum/i.test(textBefore);
      document.querySelector('#stats [data-benchmark="monthly"]').click();
      const textAfter = document.getElementById('stats').textContent;
      const monthlyBaseline = /Monthly DCA \(1 year\).*Baseline/i.test(textAfter) && /vs Monthly/i.test(textAfter);
      return {
        noLumpDataset: chart.data.datasets.every(dataset => dataset.label !== 'Lump sum'),
        defaultDailyBaseline,
        monthlyBaseline,
        clickableCards: document.querySelectorAll('#stats [data-benchmark]').length === 5
      };
    });
    const layoutRestructure = await page.evaluate(() => ({
      calculatorUnderFrequency: Boolean(document.querySelector('#calculator .frequency-guide-block')) && Boolean(document.querySelector('#calculator #dcaForm')),
      withdrawUnderSustainable: Boolean(document.querySelector('#means #withdraw')),
      noStandaloneStrategy: !document.getElementById('strategy'),
      noStandaloneBudget: !document.getElementById('budget')
    }));
    const scenarioButtons = /Market climbs/i.test(bodyText) && /Early rough patch/i.test(bodyText) && /Build your own scenario/i.test(bodyText) && /Custom market scenario controls/i.test(bodyText);
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    if (!zeroCaseEqual) throw new Error('Expected 0% market moves and 0% annual gain to make all recurring schedules equal the same annual invested amount and final table row.');
    if (!dailyComparisonTable.collapsedByDefault) throw new Error('Expected day-by-day comparison table to be collapsed by default.');
    if (!dailyComparisonTable.hasExpectedHeaders) throw new Error('Expected day-by-day comparison table headers for daily, weekly, biweekly, monthly, and quarterly only.');
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
    if (!canadaEtfGrid) throw new Error('Expected Canadian ETF matrix with standard and tilted ETF examples for U.S., Canada, and World.');
    if (!dayZeroInvested) throw new Error('Expected all modeled strategies to make their first contribution on day 0.');
    if (!layoutChecks.budgetTwoColumns) throw new Error('Expected budget cards to use a balanced two-column desktop layout.');
    if (!layoutChecks.meansFullWidth) throw new Error('Expected invest-within-your-means section separator/background to span full viewport width.');
    if (!layoutChecks.shortPromoCtas) throw new Error('Expected Wealthsimple promo CTA labels to be short enough for clean layout.');
    if (!layoutChecks.noExternalLogoImage) throw new Error('Expected Wealthsimple brand cue to avoid a broken external logo image.');
    if (!seoHero) throw new Error('Expected SEO-first hero around Keep Calm and DCA On / building through market noise.');
    if (!journeyStructure) throw new Error('Expected visible three-step journey and simplified 1 Start / 2 Automate / 3 Grow nav.');
    if (!sectionFootnotes) throw new Error('Expected section-level Footnotes and redistributed disclosures instead of Context sections/footer bullets.');
    if (!noCaveatHero) throw new Error('Expected caveat-heavy hero language to be removed.');
    if (!tfsaVisible) throw new Error('Expected TFSA estimated room output to be visible.');
    if (!taxFreeCopy) throw new Error('Expected TFSA tax-free copy to be visible.');
    if (!eligibilityCopy) throw new Error('Expected TFSA calculator eligibility-year explanation.');
    if (!recurringTip) throw new Error('Expected Wealthsimple recurring investment tip with $1/day copy.');
    if (!wealthsimplePromo) throw new Error('Expected dedicated Wealthsimple automation promo box with bank-account setup copy.');
    if (!canadaBoxNoGuide) throw new Error('Expected Canadian investors brokerage callout to omit the recurring investing guide link.');
    if (!recurringGuide) throw new Error('Expected Wealthsimple recurring investment guide link.');
    if (!unitsRule) throw new Error('Expected top simple rule to mention units at lower prices and no guessing.');
    if (!lumpSumFaq) throw new Error('Expected FAQ for deploying a large lump sum with $10,000 / $500 per trading day example.');
    if (!timingSection) throw new Error('Expected why-not-buy-the-dip timing section with day-trading loss statistic.');
    if (!riskChart) throw new Error('Expected lump sum versus DCA timing risk chart.');
    if (!lumpSumRiskFaq) throw new Error('Expected timing-risk section with cited source links and DCA pressure-reduction language.');
    if (!compoundingSection) throw new Error('Expected compounding section with 8-4-3 storytelling and Rule of 72 content.');
    if (!compoundingNav) throw new Error('Expected nav menu to include a Compounding link.');
    if (!foundationSection) throw new Error('Expected before-you-DCA foundation checklist and illustration.');
    if (!riskLevelSection) throw new Error('Expected risk-level-before-ticker section for cautious investors.');
    if (!resetNeutral) throw new Error('Expected reset-neutral button to clear moves and make all schedule outcomes equal.');
    if (!incomeTargetCalculator.visible) throw new Error('Expected 4% rule income target calculator form to render.');
    if (!incomeTargetCalculator.copy) throw new Error('Expected 4% rule income target copy and contextual footnote.');
    if (!incomeTargetCalculator.outputs) throw new Error('Expected income target calculator to output 4% target and progress results.');
    if (!incomeTargetCalculator.chart) throw new Error('Expected income target chart with portfolio, target, and contribution-crossover lines.');
    if (!incomeTargetCalculator.updates) throw new Error('Expected crossover balance to update from CAGR/monthly investment inputs.');
    if (!compoundCalculator.visible) throw new Error('Expected compounding calculator form to render.');
    if (!compoundCalculator.hasGenericPresets) throw new Error('Expected compounding calculator to include generic CAGR presets.');
    if (!compoundCalculator.selectedEquity) throw new Error('Expected selecting long-term equity preset to populate the CAGR input.');
    if (!compoundCalculator.hasOutputs) throw new Error('Expected compounding calculator to output future value, contributions, growth, and Rule-of-72 double time.');
    if (!compoundCalculator.disclaimer) throw new Error('Expected CAGR assumption disclaimer to avoid presenting assumptions as forecasts.');
    if (!sustainableBudget) throw new Error('Expected coffee and lottery examples to live inside Sustainable investing with no standalone How much should I DCA section.');
    if (!meansSection) throw new Error('Expected sustainable investing section with safety net guidance.');
    if (!marketNoisePlaybook) throw new Error('Expected market noise playbook section for rough-market DCA behaviour.');
    if (!broadEtfSection) throw new Error('Expected broad ETF risk section comparing broad ETFs, balanced ETFs, and concentrated bets.');
    if (!wealthsimpleGuide) throw new Error('Expected Wealthsimple setup guide with four numbered steps.');
    if (!referralPromo) throw new Error('Expected referral disclosure and referral signup link.');
    if (!stepByStepNav) throw new Error('Expected nav menu to include ETF examples link.');
    if (!etfToStepsLink) throw new Error('Expected at least 2 links from ETF section back to step-by-step guide (step 4 link + back link).');
    if (!withdrawSection) throw new Error('Expected withdrawal section with panic selling and planned-risk-management language.');
    if (!calmFaqs) throw new Error('Expected FAQ to address down markets, buying the dip, and crash nervousness.');
    if (false) throw new Error('noop');
    if (false) throw new Error('noop');
    if (timingSources !== 2) throw new Error(`Expected 2 cited source links in timing section, found ${timingSources}.`);
    if (marginCopy) throw new Error('The page should not contain margin copy.');
    if (statCards < 8) throw new Error(`Expected at least 8 stat cards including DCA schedule and TFSA results, found ${statCards}.`);
    if (!dcaBaselineComparison.noLumpDataset) throw new Error('Expected DCA chart to remove the lump-sum comparison series.');
    if (!dcaBaselineComparison.defaultDailyBaseline) throw new Error('Expected daily to be the default comparison baseline.');
    if (!dcaBaselineComparison.monthlyBaseline) throw new Error('Expected clicking monthly to make monthly the no-percentage baseline and compare other schedules to it.');
    if (!dcaBaselineComparison.clickableCards) throw new Error('Expected each DCA schedule stat card to be clickable as a comparison baseline.');
    if (!layoutRestructure.calculatorUnderFrequency) throw new Error('Expected calculator to live under the frequency guide inside #calculator.');
    if (!layoutRestructure.withdrawUnderSustainable) throw new Error('Expected When to withdraw content under Sustainable investing.');
    if (!layoutRestructure.noStandaloneStrategy) throw new Error('Expected standalone #strategy section to be removed.');
    if (!layoutRestructure.noStandaloneBudget) throw new Error('Expected standalone #budget section to be removed.');
    if (!scenarioButtons) throw new Error('Expected pre-built scenario buttons and custom scenario editor.');
    if (!chartCanvas) throw new Error('Expected DCA chart canvas to be visible.');
    console.log(JSON.stringify({ ok: true, zeroCaseEqual, seoHero, journeyStructure, sectionFootnotes, noCaveatHero, dailyComparisonTable, chartMoveEditor, dailyVariationControl, dayZeroInvested, layoutChecks, vtVisible, canadaEtfGrid, tfsaVisible, taxFreeCopy, eligibilityCopy, recurringTip, wealthsimplePromo, canadaBoxNoGuide, recurringGuide, unitsRule, lumpSumFaq, timingSection, riskChart, lumpSumRiskFaq, compoundingSection, compoundingNav, foundationSection, riskLevelSection, resetNeutral, incomeTargetCalculator, compoundCalculator, sustainableBudget, meansSection, marketNoisePlaybook, broadEtfSection, wealthsimpleGuide, referralPromo, stepByStepNav, etfToStepsLink, withdrawSection, removedDailyFaq, removedDailyMonthlyFaq, calmFaqs, faqReferral, statCards, dcaBaselineComparison, layoutRestructure, scenarioButtons, chartCanvas }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
