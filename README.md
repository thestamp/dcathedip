# DCA the Dip

A Jekyll educational website for **DCATheDip.com / DCATheDip.ca**.

## Features

- Beautiful responsive Jekyll landing page
- Interactive DCA-through-a-dip calculator using Chart.js
- Clickable daily, weekly, biweekly, monthly, and quarterly DCA schedule comparison
- Frequency guide with benefits and drawbacks for each schedule
- Canadian TFSA account guidance and simple contribution room calculator
- Canadian vs U.S. ETF suggestions
- Optional browser geolocation for region selection
- Wealthsimple referral link as a JavaScript variable

## Structure

- `_config.yml` — Jekyll site settings
- `_layouts/default.html` — shared HTML shell
- `index.html` — homepage content with Jekyll front matter
- `assets/css/styles.css` — site styling
- `assets/js/app.js` — calculator, ETF picker, TFSA calculator, and referral config
- `requirements.md` — product/content requirements for future updates
- `CNAME` — GitHub Pages custom domain (`dcathedip.com`)

## Configure referral link

Edit `assets/js/app.js`:

```js
const WEALTHSIMPLE_REFERRAL_URL = "https://wealthsimple.com/invite/V-MKNQ";
```

## Local development

Install Ruby and Node dependencies:

```bash
bundle install
npm install
```

Run locally with Jekyll:

```bash
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Verification

```bash
npm run test
```

The test command uses a lightweight local renderer for CI/smoke testing when Ruby/Jekyll is unavailable, then opens the built site in Playwright.

## Deploy with GitHub Pages

This repo is configured as a GitHub Pages-compatible Jekyll site. In GitHub repo settings, choose Pages deployment from the `main` branch root, or use GitHub's default Jekyll Pages build.
