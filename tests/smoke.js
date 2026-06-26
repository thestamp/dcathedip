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
    await page.locator('#dip').evaluate(el => {
      el.value = 45;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.locator('[data-region="us"]').click();
    const vtVisible = await page.locator('text=VT').first().isVisible();
    const statCards = await page.locator('.stat').count();
    const chartCanvas = await page.locator('#dcaChart').isVisible();
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    if (!vtVisible) throw new Error('Expected U.S. ETF ticker VT to be visible after selecting U.S. region.');
    if (statCards < 8) throw new Error(`Expected at least 8 stat cards, found ${statCards}.`);
    if (!chartCanvas) throw new Error('Expected DCA chart canvas to be visible.');
    console.log(JSON.stringify({ ok: true, vtVisible, statCards, chartCanvas }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
