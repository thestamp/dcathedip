const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '_site');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function createServer() {
  return http.createServer((req, res) => {
    const requested = new URL(req.url, 'http://localhost').pathname;
    const safePath = path.normalize(requested).replace(/^\/+/, '');
    let filePath = path.join(root, safePath || 'index.html');
    if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
    if (!filePath.startsWith(root)) return res.writeHead(403).end('Forbidden');
    fs.readFile(filePath, (err, data) => {
      if (err) return res.writeHead(404).end('Not found');
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
  const errors = [];
  try {
    for (const viewport of [
      { name: 'iphone-se', width: 375, height: 667 },
      { name: 'iphone-12', width: 390, height: 844 },
      { name: 'small-android', width: 360, height: 800 },
      { name: 'tablet', width: 768, height: 1024 }
    ]) {
      const page = await browser.newPage({ viewport, isMobile: viewport.width < 600 });
      page.on('pageerror', e => errors.push(`${viewport.name}: ${e.message}`));
      page.on('console', msg => {
        const text = msg.text();
        const isExternalAdResourceError = /googlesyndication|googleads|doubleclick|adsbygoogle|pagead|google\.com.*Content Security Policy/i.test(text)
          || /^Failed to load resource: the server responded with a status of (400|403)/i.test(text);
        if (msg.type() === 'error' && !isExternalAdResourceError) errors.push(`${viewport.name}: ${text}`);
      });
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      const report = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const overflow = [];
        for (const el of document.querySelectorAll('body *')) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && (rect.left < -2 || rect.right > viewportWidth + 2)) {
            overflow.push({ tag: el.tagName.toLowerCase(), cls: el.className, id: el.id, left: rect.left, right: rect.right, width: rect.width });
          }
        }
        const textTooSmall = [...document.querySelectorAll('p, li, a, button, label, input, select, summary')]
          .filter(el => parseFloat(getComputedStyle(el).fontSize) < 12)
          .map(el => ({ tag: el.tagName.toLowerCase(), cls: el.className, text: el.textContent.trim().slice(0, 40), size: getComputedStyle(el).fontSize }));
        const buttonsTooSmall = [...document.querySelectorAll('a.button, button')]
          .filter(el => {
            const r = el.getBoundingClientRect();
            return r.width < 44 || r.height < 44;
          })
          .map(el => ({ text: el.textContent.trim(), width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height }));
        return {
          viewportWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflow: overflow.slice(0, 20),
          textTooSmall: textTooSmall.slice(0, 20),
          buttonsTooSmall
        };
      });
      if (report.scrollWidth > report.viewportWidth + 2) {
        throw new Error(`${viewport.name} has body-level horizontal overflow: ${JSON.stringify(report.overflow.slice(0, 5))}; scrollWidth=${report.scrollWidth}, viewport=${report.viewportWidth}`);
      }
      if (report.textTooSmall.length) throw new Error(`${viewport.name} has text under 12px: ${JSON.stringify(report.textTooSmall.slice(0, 5))}`);
      if (report.buttonsTooSmall.length) throw new Error(`${viewport.name} has touch targets under 44px: ${JSON.stringify(report.buttonsTooSmall.slice(0, 5))}`);
      await page.close();
    }
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    console.log(JSON.stringify({ ok: true, checked: ['iphone-se', 'iphone-12', 'small-android', 'tablet'] }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
