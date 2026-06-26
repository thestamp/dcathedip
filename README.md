# DCA the Dip

A static educational website for **DCATheDip.com / DCATheDip.ca**.

## Features

- Beautiful responsive landing page
- Interactive DCA-through-a-dip calculator using Chart.js
- Lump sum vs daily DCA comparison
- Drawdown-based contribution accelerator rules
- Canadian vs U.S. ETF suggestions
- Optional browser geolocation for region selection
- Wealthsimple referral link as a JavaScript variable

## Configure referral link

Edit `app.js`:

```js
const WEALTHSIMPLE_REFERRAL_URL = "https://www.wealthsimple.com/invite/YOUR_REFERRAL_CODE";
```

## Local development

Install dependencies and run verification:

```bash
npm install
npm run test
```

Serve locally with any static server, for example:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy

The included GitHub Actions workflow deploys the static files to GitHub Pages from `main`.

In GitHub repo settings, set Pages source to **GitHub Actions** if needed.
