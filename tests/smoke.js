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
    const text = msg.text();
    const isExternalAdResourceError = /googlesyndication|googleads|doubleclick|adsbygoogle|pagead|google\.com.*Content Security Policy/i.test(text)
      || /^Failed to load resource: the server responded with a status of (400|403)/i.test(text);
    if (msg.type() === 'error' && !isExternalAdResourceError) errors.push(text);
  });

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.locator('#step-6-calculator').scrollIntoViewIfNeeded();
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
    await page.locator('#step-4-account').scrollIntoViewIfNeeded();
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
      const sustainableRect = document.querySelector('#step-6-sustainable .sustainable-layout').getBoundingClientRect();
      const longPromoCta = [...document.querySelectorAll('.wealthsimple-promo-actions .button')]
        .some(button => button.textContent.trim().length > 38);
      const externalLogoImage = Boolean(document.querySelector('.wealthsimple-logo-lockup img'));
      return {
        budgetTwoColumns: budgetCols === 2,
        sustainableVisible: Boolean(document.querySelector('#step-6-sustainable')),
        shortPromoCtas: !longPromoCta,
        noExternalLogoImage: !externalLogoImage
      };
    });
    const canadaEtfGrid = await page.evaluate(() => {
      const grid = document.querySelector('#tickerGrid');
      const text = grid.textContent;
      const hasPieToggle = /Countries/i.test(text) && /Industries/i.test(text) && /Top 10 Stocks/i.test(text);
      const cellCount = document.querySelectorAll('.etf-cell-card:not(.empty)').length;
      const hasBest = /★/.test(text);
      const hasPies = document.querySelectorAll('.etf-pie').length > 0;
      // Table with 4 rows (BMO, iShares, Vanguard, Factor)
      const rowCount = document.querySelectorAll('.etf-table-row').length;
      return grid.classList.contains('etf-grid')
        && hasPieToggle
        && cellCount >= 10
        && rowCount === 4
        && hasBest
        && hasPies
        && /ZSP\b/i.test(text) && /VFV\b/i.test(text) && /XUS\b/i.test(text)
        && /ZIU\b/i.test(text) && /XIU\b/i.test(text) && /VCN\b/i.test(text)
        && /XEQT\b/i.test(text) && /VEQT\b/i.test(text) && /ZEQT\b/i.test(text)
        && /CAUS\b/i.test(text) && /CACE\b/i.test(text) && /CAGE\b/i.test(text)
        && /MER/i.test(text) && /5Y/i.test(text)
        && /leans more Canada/i.test(text);
    });
    const leveragedSection = await page.locator('#step-5-investment .advanced-leverage-section').count().then(count => count === 1);
    const tfsaVisible = await page.locator('text=Estimated room remaining').first().isVisible();
    const taxFreeCopy = await page.locator('text=tax-free').first().isVisible();
    const bodyText = await page.locator('body').textContent();
    const seoHero = /Keep Calm and DCA On/i.test(bodyText) && /From debt to deposits/i.test(bodyText) && /A 6-step plan for Canadian ETF investors/i.test(bodyText) && /You are not guessing the market/i.test(bodyText);
    const navText = await page.locator('.nav-links').textContent();
    const journeyStructure = /The Plan/i.test(navText) && /Tackle high-interest credit card debt/i.test(navText) && /Invest a sustainable amount/i.test(navText);
    const sectionFootnotes = !/Context:/i.test(bodyText) && /Footnotes live with each section/i.test(bodyText) && /Educational content only, not financial advice/i.test(bodyText) && /Referral links may provide a benefit/i.test(bodyText) && /ETF tickers are examples for research/i.test(bodyText) && /Confirm your official TFSA contribution room/i.test(bodyText);
    const noCaveatHero = !/The goal is not to predict market bottoms/i.test(bodyText) && !/educational guide to automated/i.test(bodyText);
    const eligibilityCopy = /Eligibility year/i.test(bodyText) && /past contributions/i.test(bodyText) && /last year.s withdrawals/i.test(bodyText) && /last updated for 2026/i.test(bodyText);
    const marginCopy = /\\bmargin\\b/i.test(bodyText) && !/\\bmargin (account|call|debt)\\b/i.test(bodyText);
    const recurringTip = /recurring investments/i.test(bodyText) && /\$1 a day/i.test(bodyText);
    const wealthsimplePromo = /Automate your recurring investments/i.test(bodyText) && /recurring ETF purchases from your bank account/i.test(bodyText);
    const canadaBoxNoGuide = await page.locator('#wealthsimpleBox a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count === 0);
    const unitsRule = /Same dollars, more units when prices dip/i.test(bodyText) && /No guessing/i.test(bodyText);
    const lumpSumFaq = /Is DCA better than lump sum investing\?/i.test(bodyText) && /investing the full amount right away has often done better/i.test(bodyText) && /DCA may be easier emotionally/i.test(bodyText);
    const timingSection = /Why don't I just buy at the bottom and sell at the top\?/i.test(bodyText) && /Research on individual day traders/i.test(bodyText);
    const riskChart = /Easier psychologically/i.test(bodyText) && /Builds a habit/i.test(bodyText) && /Investing from income/i.test(bodyText) && /Large lump sum/i.test(bodyText) && /Staying invested matters more than perfect timing/i.test(bodyText);
    const lumpSumRiskFaq = /Why don't I just buy at the bottom and sell at the top\?/i.test(bodyText) && /DCA removes the pressure/i.test(bodyText) && /Barber, Lee, Liu/i.test(bodyText);
    const compoundingSection = /The long game/i.test(bodyText)
          && /3 crossovers to financial freedom/i.test(bodyText)
          && /Growth overtakes your contributions/i.test(bodyText)
          && /Growth overtakes your employment income/i.test(bodyText)
          && /Investment income covers your living expenses/i.test(bodyText);
    const incomeEtfSection = /Income ETF examples/i.test(bodyText)
          && /Income-oriented ETFs for the long game/i.test(bodyText)
          && /Growth Heavy/i.test(bodyText)
          && /Balanced Growth & Income/i.test(bodyText)
          && /Dividend Heavy/i.test(bodyText)
          && /ZDV\b/i.test(bodyText) && /DGRC\b/i.test(bodyText)
                    && /XDIV\b/i.test(bodyText) && /XEI\b/i.test(bodyText)
                    && /VDY\b/i.test(bodyText) && /CDZ\b/i.test(bodyText) && /ZWC\b/i.test(bodyText)
          && /Yield/i.test(bodyText) && /Covered call/i.test(bodyText);
    const compoundingNav = await page.locator('.nav-dropdown-menu a[href="#step-3-target"]').count().then(count => count === 1);
    const foundationSection = /A 6-step plan for real-life investing/i.test(bodyText)
          && /Tackle high-interest credit card debt/i.test(bodyText)
          && /Build up rainy day fund/i.test(bodyText)
          && /Choose the right investment/i.test(bodyText);
    // Also check the new step content exists
    const debtSection = /Step 1/i.test(bodyText) && /Tackle high-interest credit card debt first/i.test(bodyText) && /Consolidate what you can/i.test(bodyText) && /Clear the easiest one first/i.test(bodyText) && /Then attack by interest rate/i.test(bodyText);
    const emergencySection = /Step 2/i.test(bodyText) && /Build a rainy day fund/i.test(bodyText) && /Start with one month of expenses/i.test(bodyText) && /Build toward 3–6 months/i.test(bodyText);
    const targetSection = /Step 3/i.test(bodyText) && /Set a financial target/i.test(bodyText);
    const accountSection = /Step 4/i.test(bodyText) && /Create the right account/i.test(bodyText) && /Start with an FHSA and a TFSA/i.test(bodyText);
    const investmentSection = /Step 5/i.test(bodyText) && /Choose the right investment/i.test(bodyText);
    const sustainableSection = /Step 6/i.test(bodyText) && /Invest a sustainable amount/i.test(bodyText);
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
      const years = document.getElementById('crossYears');
      current.value = 10000;
      monthly.value = 500;
      cagr.value = 7;
      spending.value = 40000;
      years.value = 25;
      years.dispatchEvent(new Event('input', { bubbles: true }));
      const resultText = document.getElementById('crossoverResults').textContent;
      const chart = window.Chart.getChart(document.getElementById('crossoverChart'));
      return {
        visible: Boolean(document.getElementById('crossoverForm')),
        copy: /Investment target/i.test(document.body.textContent) && /4% withdrawal rate/i.test(document.body.textContent) && /Footnotes/i.test(document.body.textContent),
        outputs: /Investment target/i.test(resultText) && /Projected value/i.test(resultText) && /Contribution crossover/i.test(resultText) && /Crossover timing/i.test(resultText),
        chart: Boolean(chart) && chart.data.datasets.some(dataset => dataset.label === 'Portfolio balance') && chart.data.datasets.some(dataset => dataset.label === 'Investment target') && chart.data.datasets.some(dataset => dataset.label === 'Contribution crossover'),
        updates: resultText.includes('$1,000,000') && resultText.includes('Shortfall')
      };
    });
    const noStandaloneBudget = await page.locator('#budget').count().then(count => count === 0);
    const sustainableBudget = noStandaloneBudget && /Invest a sustainable amount/i.test(bodyText) && /[$]5 weekday coffee is [$]25 a week/i.test(bodyText) && /[$]1,200 a year/i.test(bodyText) && /[$]5 weekly lottery ticket is [$]260 a year/i.test(bodyText);
    const meansSection = /Invest a sustainable amount/i.test(bodyText) && /The calm plan is not the most aggressive plan/i.test(bodyText) && /Build your safety net first/i.test(bodyText) && /Keep emergency cash available/i.test(bodyText) && /Keep the habit sustainable/i.test(bodyText) && sustainableBudget;
    const marketNoisePlaybook = /Market noise playbook/i.test(bodyText) && /When markets get rough, your plan keeps steady/i.test(bodyText) && /Red days are not instructions/i.test(bodyText) && /Green days are not permission to chase/i.test(bodyText) && /Check the plan, then keep the schedule/i.test(bodyText);
    const withdrawSection = /The only rule that matters/i.test(bodyText) && /Withdraw for real life/i.test(bodyText) && /real-life event/i.test(bodyText) && /rebalancing/i.test(bodyText) && /you only sell when life actually needs it/i.test(bodyText);
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
      && /\$25 referral bonus/i.test(bodyText);
    const stepByStepNav = await page.locator('.nav-links a[href="#step-5-investment"]').count().then(count => count === 1);
    const etfToStepsLink = await page.locator('a[href="#step-4-account"]').count().then(count => count >= 1);
    const removedDailyFaq = !/Is daily DCA always better than lump sum\?/i.test(bodyText);
    const removedDailyMonthlyFaq = !/Why recommend daily instead of monthly\?/i.test(bodyText);
    const calmFaqs = /Should I keep DCA investing when the market is down\?/i.test(bodyText) && /Does DCA mean buying the dip\?/i.test(bodyText) && /What if I feel nervous investing during a crash\?/i.test(bodyText);
    const faqReferral = await page.locator('#faq a[href="https://wealthsimple.com/invite/V-MKNQ"]').count().then(count => count === 1);
    const recurringGuide = await page.locator('a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count >= 2);
    const timingSources = await page.locator('a[href*="barber-lee-liu-odean.pdf"], a[href*="rbcgam.com"]').count();
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
      calculatorUnderStep6: Boolean(document.querySelector('#step-6-sustainable #step-6-calculator')),
      withdrawUnderTarget: Boolean(document.querySelector('#step-3-target .withdraw-subsection')),
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
    if (!canadaEtfGrid) throw new Error('Expected Canadian ETF matrix with standard, tilted, and factor ETF examples for U.S., Canada, and World.');
    if (!leveragedSection) throw new Error('Expected 1.25× advanced leveraged ETF section (collapsible).');
    if (!dayZeroInvested) throw new Error('Expected all modeled strategies to make their first contribution on day 0.');
    if (!layoutChecks.budgetTwoColumns) throw new Error('Expected budget cards to use a balanced two-column desktop layout.');
    if (!layoutChecks.sustainableVisible) throw new Error('Expected step 6 sustainable investing section to render.');
    if (!layoutChecks.shortPromoCtas) throw new Error('Expected Wealthsimple promo CTA labels to be short enough for clean layout.');
    if (!layoutChecks.noExternalLogoImage) throw new Error('Expected Wealthsimple brand cue to avoid a broken external logo image.');
    if (!seoHero) throw new Error('Expected SEO-first hero around Keep Calm and DCA On / investing through the market.');
    if (!journeyStructure) throw new Error('Expected nav to have The Plan dropdown and referral button.');
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
    if (!compoundingSection) throw new Error('Expected 3 crossovers section with growth milestones and compound calculator.');
    if (!incomeEtfSection) throw new Error('Expected income ETF section with Growth Heavy, Balanced, and Dividend Heavy categories and all 7 tickers.');
    if (!compoundingNav) throw new Error('Expected nav Plan dropdown to include step 3 link.');
    if (!foundationSection) throw new Error('Expected 6-step foundation checklist with all step links.');
    if (!debtSection) throw new Error('Expected Step 1 high-interest debt consolidation strategy content.');
    if (!emergencySection) throw new Error('Expected Step 2 rainy day fund content with 1-month starter and 3-6 month target.');
    if (!targetSection) throw new Error('Expected Step 3 financial target section.');
    if (!accountSection) throw new Error('Expected Step 4 account section with FHSA + TFSA prioritization content.');
    if (!investmentSection) throw new Error('Expected Step 5 investment section.');
    if (!sustainableSection) throw new Error('Expected Step 6 sustainable amount section.');
    if (!resetNeutral) throw new Error('Expected reset-neutral button to clear moves and make all schedule outcomes equal.');
    if (!incomeTargetCalculator.visible) throw new Error('Expected 4% rule income target calculator form to render.');
    if (!incomeTargetCalculator.copy) throw new Error('Expected 4% rule income target copy and contextual footnote.');
    if (!incomeTargetCalculator.outputs) throw new Error('Expected income target calculator to output 4% target and progress results.');
    if (!incomeTargetCalculator.chart) throw new Error('Expected income target chart with portfolio, target, and contribution-crossover lines.');
    if (!incomeTargetCalculator.updates) throw new Error('Expected crossover balance to update from CAGR/monthly investment inputs.');
    if (!sustainableBudget) throw new Error('Expected coffee and lottery examples to live inside Sustainable investing with no standalone How much should I DCA section.');
    if (!meansSection) throw new Error('Expected step 6 sustainable investing section with safety net guidance.');
    if (!marketNoisePlaybook) throw new Error('Expected market noise playbook section for rough-market DCA behaviour.');
    if (!broadEtfSection) throw new Error('Expected broad ETF risk section comparing broad ETFs, balanced ETFs, and concentrated bets.');
    if (!wealthsimpleGuide) throw new Error('Expected Wealthsimple setup guide with four numbered steps.');
    if (!referralPromo) throw new Error('Expected referral disclosure and referral signup link.');
    if (!stepByStepNav) throw new Error('Expected nav menu to include ETF link to step 5.');
    if (!etfToStepsLink) throw new Error('Expected at least 1 link from ETF section back to step 4 account section.');
    if (!withdrawSection) throw new Error('Expected withdrawal section with "only rule that matters" and real-life event language.');
    if (!calmFaqs) throw new Error('Expected FAQ to address down markets, buying the dip, and crash nervousness.');
    if (false) throw new Error('noop');
    if (false) throw new Error('noop');
    if (timingSources < 2) throw new Error(`Expected 2 cited source links in timing section, found ${timingSources}.`);
    if (marginCopy) throw new Error('The page should not contain margin copy.');
    if (statCards < 8) throw new Error(`Expected at least 8 stat cards including DCA schedule and TFSA results, found ${statCards}.`);
    if (!dcaBaselineComparison.noLumpDataset) throw new Error('Expected DCA chart to remove the lump-sum comparison series.');
    if (!dcaBaselineComparison.defaultDailyBaseline) throw new Error('Expected daily to be the default comparison baseline.');
    if (!dcaBaselineComparison.monthlyBaseline) throw new Error('Expected clicking monthly to make monthly the no-percentage baseline and compare other schedules to it.');
    if (!dcaBaselineComparison.clickableCards) throw new Error('Expected each DCA schedule stat card to be clickable as a comparison baseline.');
    if (!layoutRestructure.calculatorUnderStep6) throw new Error('Expected calculator to live under step 6 sustainable section.');
    if (!layoutRestructure.withdrawUnderTarget) throw new Error('Expected When to withdraw content under step 3 financial target.');
    if (!layoutRestructure.noStandaloneStrategy) throw new Error('Expected standalone #strategy section to be removed.');
    if (!layoutRestructure.noStandaloneBudget) throw new Error('Expected standalone #budget section to be removed.');
    if (!scenarioButtons) throw new Error('Expected pre-built scenario buttons and custom scenario editor.');
    if (!chartCanvas) throw new Error('Expected DCA chart canvas to be visible.');
    console.log(JSON.stringify({ ok: true, zeroCaseEqual, seoHero, journeyStructure, sectionFootnotes, noCaveatHero, dailyComparisonTable, chartMoveEditor, dailyVariationControl, dayZeroInvested, layoutChecks, canadaEtfGrid, leveragedSection, tfsaVisible, taxFreeCopy, eligibilityCopy, recurringTip, wealthsimplePromo, canadaBoxNoGuide, recurringGuide, unitsRule, lumpSumFaq, timingSection, riskChart, lumpSumRiskFaq, compoundingSection, incomeEtfSection, compoundingNav, foundationSection, debtSection, emergencySection, targetSection, accountSection, investmentSection, sustainableSection, resetNeutral, incomeTargetCalculator, sustainableBudget, meansSection, marketNoisePlaybook, broadEtfSection, wealthsimpleGuide, referralPromo, stepByStepNav, etfToStepsLink, withdrawSection, removedDailyFaq, removedDailyMonthlyFaq, calmFaqs, faqReferral, statCards, dcaBaselineComparison, layoutRestructure, scenarioButtons, chartCanvas }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
