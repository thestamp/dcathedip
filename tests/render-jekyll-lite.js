const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const site = path.join(root, '_site');

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function stripFrontMatter(source) {
  return source.replace(/^---[\s\S]*?---\s*/, '');
}

function frontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  const data = {};
  if (!match) return data;
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (pair) data[pair[1]] = pair[2].replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function renderLiquid(layout, page, siteConfig, content) {
  return layout
    .replace(/{{\s*content\s*}}/g, content)
    .replace(/{{\s*page\.lang \| default: site\.lang \| default: 'en'\s*}}/g, page.lang || siteConfig.lang || 'en')
    .replace(/{{\s*page\.description \| default: site\.description \| escape\s*}}/g, page.description || siteConfig.description || '')
    .replace(/{{\s*page\.title \| default: site\.title \| escape\s*}}/g, page.title || siteConfig.title || '')
    .replace(/{{\s*page\.url \| absolute_url\s*}}/g, siteConfig.url || '/')
    .replace(/{{\s*'\/assets\/css\/styles\.css' \| relative_url\s*}}/g, '/assets/css/styles.css')
    .replace(/{{\s*'\/assets\/js\/app\.js' \| relative_url\s*}}/g, '/assets/js/app.js');
}

function parseConfig() {
  const config = read('_config.yml');
  const data = {};
  for (const line of config.split('\n')) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (pair) data[pair[1]] = pair[2].replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

fs.rmSync(site, { recursive: true, force: true });
fs.mkdirSync(site, { recursive: true });
const indexSource = read('index.html');
const layout = read('_layouts/default.html');
const html = renderLiquid(layout, frontMatter(indexSource), parseConfig(), stripFrontMatter(indexSource));
fs.writeFileSync(path.join(site, 'index.html'), html);
copyDir(path.join(root, 'assets'), path.join(site, 'assets'));
if (fs.existsSync(path.join(root, 'CNAME'))) fs.copyFileSync(path.join(root, 'CNAME'), path.join(site, 'CNAME'));
console.log(JSON.stringify({ ok: true, built: '_site/index.html' }));
