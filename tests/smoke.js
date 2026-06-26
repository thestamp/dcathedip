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
    await page.locator('[data-region="us"]').click();
    await page.locator('#tfsa').scrollIntoViewIfNeeded();
    await page.locator('#eligibilityYear').fill('2011');
    await page.locator('#tfsaContributed').fill('25000');
    await page.locator('#tfsaWithdrawals').fill('5000');
    const dayZeroInvested = await page.evaluate(() => {
      const result = simulate();
      return result.lumpValues[0] > 0 && result.schedules.every(schedule => schedule.values[0] > 0);
    });
    const vtVisible = await page.locator('text=VT').first().isVisible();
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
    const removedDailyFaq = !/Is daily DCA always better than lump sum\?/i.test(bodyText);
    const removedDailyMonthlyFaq = !/Why recommend daily instead of monthly\?/i.test(bodyText);
    const faqReferral = await page.locator('#faq a[href="https://wealthsimple.com/invite/V-MKNQ"]').count().then(count => count === 1);
    const recurringGuide = await page.locator('a[href*="9544942923547-Set-up-a-recurring-investment"]').count().then(count => count >= 2);
    const timingSources = await page.locator('#timing a[href*="barber-lee-liu-odean.pdf"], #timing a[href*="rbcgam.com"]').count();
    const statCards = await page.locator('.stat').count();
    const chartCanvas = await page.locator('#dcaChart').isVisible();
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    if (!vtVisible) throw new Error('Expected U.S. ETF ticker VT to be visible after selecting U.S. region.');
    if (!dayZeroInvested) throw new Error('Expected all modeled strategies to make their first contribution on day 0.');
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
    if (!withdrawSection) throw new Error('Expected when-to-withdraw section with panic selling warning and three pillars.');
    if (!removedDailyFaq) throw new Error('Expected "Is daily DCA always better than lump sum?" FAQ to be removed.');
    if (!removedDailyMonthlyFaq) throw new Error('Expected "Why recommend daily instead of monthly?" FAQ to be removed.');
    if (!faqReferral) throw new Error('Expected Wealthsimple referral link inside the lump sum FAQ.');
    if (timingSources !== 2) throw new Error(`Expected 2 cited source links in timing section, found ${timingSources}.`);
    if (marginCopy) throw new Error('The page should not contain margin copy.');
    if (statCards < 9) throw new Error(`Expected at least 9 stat cards including TFSA results, found ${statCards}.`);
    if (!chartCanvas) throw new Error('Expected DCA chart canvas to be visible.');
    console.log(JSON.stringify({ ok: true, dayZeroInvested, vtVisible, tfsaVisible, taxFreeCopy, eligibilityCopy, recurringTip, wealthsimplePromo, canadaBoxNoGuide, recurringGuide, unitsRule, lumpSumFaq, timingSection, riskChart, lumpSumRiskFaq, budgetSection, meansSection, withdrawSection, removedDailyFaq, removedDailyMonthlyFaq, faqReferral, statCards, chartCanvas }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
