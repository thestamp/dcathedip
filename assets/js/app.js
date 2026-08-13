// Keep Calm and DCA On configuration
const WEALTHSIMPLE_REFERRAL_URL = "https://wealthsimple.com/invite/V-MKNQ";

// ETF data with country, sector, and top-10 holdings for pie charts
// ETF data with country, sector, and top-10 holdings for pie charts
const etfsFlat = [
  // === WORLD / INTERNATIONAL ===
  {
    ticker: "XEQT.TO", name: "iShares Core Equity ETF", provider: "iShares", market: "World", type: "standard",
    mer: "0.20%", return1y: "23.8%", return5y: "14.2%",
    lean: "~25% Canada / 45% U.S. / 30% International. Lower Canada tilt.",
    countries: [{ name: "Canada", pct: 25 }, { name: "U.S.", pct: 45 }, { name: "Japan", pct: 5 }, { name: "U.K.", pct: 4 }, { name: "China", pct: 3 }, { name: "France", pct: 2.5 }, { name: "Germany", pct: 2 }, { name: "Switzerland", pct: 2 }, { name: "Australia", pct: 1.5 }, { name: "Netherlands", pct: 1 }, { name: "Other", pct: 9 }],
    sectors: [{ name: "Technology", pct: 23 }, { name: "Financials", pct: 21 }, { name: "Industrials", pct: 12 }, { name: "Consumer Cyclical", pct: 9 }, { name: "Energy", pct: 7 }, { name: "Healthcare", pct: 7 }, { name: "Communication", pct: 6 }, { name: "Other", pct: 15 }],
    top10: [{ name: "Apple", pct: 2.0 }, { name: "Microsoft", pct: 1.5 }, { name: "NVIDIA", pct: 1.5 }, { name: "Amazon", pct: 1.0 }, { name: "RBC", pct: 1.0 }, { name: "TD Bank", pct: 0.8 }, { name: "Meta", pct: 0.7 }, { name: "Alphabet", pct: 0.7 }, { name: "Shopify", pct: 0.6 }, { name: "Brookfield", pct: 0.5 }],
    top10Pct: 10.3
  },
  {
    ticker: "VEQT.TO", name: "Vanguard All-Equity ETF", provider: "Vanguard", market: "World", type: "standard",
    mer: "0.24%", return1y: "23.9%", return5y: "14.0%",
    lean: "~30% Canada / 42% U.S. / 28% International. Leans more Canada.",
    countries: [{ name: "Canada", pct: 30 }, { name: "U.S.", pct: 42 }, { name: "Japan", pct: 4 }, { name: "U.K.", pct: 3.5 }, { name: "China", pct: 2.5 }, { name: "France", pct: 2 }, { name: "Germany", pct: 2 }, { name: "Switzerland", pct: 1.5 }, { name: "Australia", pct: 1.5 }, { name: "Netherlands", pct: 1 }, { name: "Other", pct: 10 }],
    sectors: [{ name: "Technology", pct: 21 }, { name: "Financials", pct: 20 }, { name: "Industrials", pct: 12 }, { name: "Consumer Cyclical", pct: 9 }, { name: "Energy", pct: 7 }, { name: "Healthcare", pct: 7 }, { name: "Communication", pct: 6 }, { name: "Other", pct: 18 }],
    top10: [{ name: "Apple", pct: 2.8 }, { name: "RBC", pct: 2.2 }, { name: "Microsoft", pct: 2.1 }, { name: "Amazon", pct: 1.6 }, { name: "TD Bank", pct: 1.4 }, { name: "NVIDIA", pct: 1.3 }, { name: "Shopify", pct: 1.2 }, { name: "Enbridge", pct: 1.1 }, { name: "BMO", pct: 1.0 }, { name: "Brookfield", pct: 0.9 }],
    top10Pct: 15.6
  },
  {
    ticker: "ZEQT.TO", name: "BMO All-Equity ETF", provider: "BMO", market: "World", type: "standard",
    mer: "0.20%", return1y: "23.7%", return5y: "13.5%",
    lean: "~25% Canada / 45% U.S. / 30% International. Similar to XEQT.",
    countries: [{ name: "Canada", pct: 25 }, { name: "U.S.", pct: 45 }, { name: "Japan", pct: 5 }, { name: "U.K.", pct: 4 }, { name: "China", pct: 3 }, { name: "France", pct: 2.5 }, { name: "Germany", pct: 2 }, { name: "Switzerland", pct: 2 }, { name: "Australia", pct: 1.5 }, { name: "Netherlands", pct: 1 }, { name: "Other", pct: 9 }],
    sectors: [{ name: "Technology", pct: 23 }, { name: "Financials", pct: 21 }, { name: "Industrials", pct: 12 }, { name: "Consumer Cyclical", pct: 9 }, { name: "Energy", pct: 7 }, { name: "Healthcare", pct: 7 }, { name: "Communication", pct: 6 }, { name: "Other", pct: 15 }],
    top10: [{ name: "Apple", pct: 2.0 }, { name: "Microsoft", pct: 1.5 }, { name: "NVIDIA", pct: 1.5 }, { name: "Amazon", pct: 1.0 }, { name: "RBC", pct: 1.0 }, { name: "TD Bank", pct: 0.8 }, { name: "Meta", pct: 0.7 }, { name: "Alphabet", pct: 0.7 }, { name: "Shopify", pct: 0.6 }, { name: "Brookfield", pct: 0.5 }],
    top10Pct: 10.3
  },
  {
    ticker: "CAGE.TO", name: "Avantis CIBC All-Equity", provider: "Avantis", market: "World", type: "tilted",
    mer: "0.37%", return1y: "24.1%", return5y: "14.8%",
    lean: "Global all-equity with factor tilts toward value and profitability.",
    countries: [{ name: "Canada", pct: 22 }, { name: "U.S.", pct: 48 }, { name: "Japan", pct: 5 }, { name: "U.K.", pct: 3 }, { name: "China", pct: 3 }, { name: "France", pct: 2 }, { name: "Germany", pct: 2 }, { name: "Switzerland", pct: 1.5 }, { name: "Australia", pct: 1.5 }, { name: "Netherlands", pct: 1 }, { name: "Other", pct: 11 }],
    sectors: [{ name: "Technology", pct: 20 }, { name: "Financials", pct: 22 }, { name: "Industrials", pct: 14 }, { name: "Consumer Cyclical", pct: 8 }, { name: "Energy", pct: 8 }, { name: "Healthcare", pct: 7 }, { name: "Other", pct: 21 }],
    top10: [{ name: "Apple", pct: 1.8 }, { name: "Microsoft", pct: 1.4 }, { name: "RBC", pct: 1.2 }, { name: "NVIDIA", pct: 1.2 }, { name: "Amazon", pct: 0.9 }, { name: "TD Bank", pct: 0.8 }, { name: "Meta", pct: 0.7 }, { name: "Alphabet", pct: 0.6 }, { name: "Shopify", pct: 0.6 }, { name: "Enbridge", pct: 0.5 }],
    top10Pct: 9.7
  },
  {
    ticker: "HEQL.TO", name: "Global X Enhanced All-Equity", provider: "Global X", market: "World", type: "leveraged",
    mer: "0.44%", return1y: "30.2%", return5y: "20.5%",
    lean: "1.25× daily leveraged global all-equity. Amplifies gains and losses.",
    countries: [{ name: "Canada", pct: 25 }, { name: "U.S.", pct: 45 }, { name: "Japan", pct: 5 }, { name: "U.K.", pct: 4 }, { name: "France", pct: 2.5 }, { name: "Germany", pct: 2 }, { name: "Switzerland", pct: 2 }, { name: "Australia", pct: 1.5 }, { name: "Netherlands", pct: 1 }, { name: "Other", pct: 12 }],
    sectors: [{ name: "Technology", pct: 23 }, { name: "Financials", pct: 21 }, { name: "Industrials", pct: 12 }, { name: "Consumer Cyclical", pct: 9 }, { name: "Energy", pct: 7 }, { name: "Other", pct: 28 }],
    top10: [{ name: "Apple", pct: 2.0 }, { name: "Microsoft", pct: 1.5 }, { name: "NVIDIA", pct: 1.5 }, { name: "Amazon", pct: 1.0 }, { name: "RBC", pct: 1.0 }, { name: "TD Bank", pct: 0.8 }, { name: "Meta", pct: 0.7 }, { name: "Alphabet", pct: 0.7 }, { name: "Shopify", pct: 0.6 }, { name: "Brookfield", pct: 0.5 }],
    top10Pct: 10.3
  },

  // === CANADA ===
  {
    ticker: "ZIU.TO", name: "BMO S&P/TSX 60 Index ETF", provider: "BMO", market: "Canada", type: "standard",
    mer: "0.14%", return1y: "30.1%", return5y: "12.0%",
    lean: "60 largest Canadian companies. Concentrated large-cap.",
    countries: [{ name: "Canada", pct: 100 }],
    sectors: [{ name: "Financials", pct: 43 }, { name: "Energy", pct: 17 }, { name: "Materials", pct: 12 }, { name: "Technology", pct: 8 }, { name: "Industrials", pct: 8 }, { name: "Other", pct: 12 }],
    top10: [{ name: "RBC", pct: 10.3 }, { name: "TD Bank", pct: 7.2 }, { name: "Shopify", pct: 5.0 }, { name: "CN Rail", pct: 4.0 }, { name: "Enbridge", pct: 3.8 }, { name: "BMO", pct: 3.5 }, { name: "Brookfield", pct: 3.0 }, { name: "CPKC", pct: 2.8 }, { name: "Suncor", pct: 2.7 }, { name: "CNQ", pct: 2.5 }],
    top10Pct: 44.8
  },
  {
    ticker: "XIU.TO", name: "iShares S&P/TSX 60 ETF", provider: "iShares", market: "Canada", type: "standard",
    mer: "0.18%", return1y: "30.0%", return5y: "11.8%",
    lean: "Same 60-company index as ZIU. Higher MER for identical exposure.",
    countries: [{ name: "Canada", pct: 100 }],
    sectors: [{ name: "Financials", pct: 43 }, { name: "Energy", pct: 17 }, { name: "Materials", pct: 12 }, { name: "Technology", pct: 8 }, { name: "Industrials", pct: 8 }, { name: "Other", pct: 12 }],
    top10: [{ name: "RBC", pct: 10.3 }, { name: "TD Bank", pct: 7.2 }, { name: "Shopify", pct: 5.0 }, { name: "CN Rail", pct: 4.0 }, { name: "Enbridge", pct: 3.8 }, { name: "BMO", pct: 3.5 }, { name: "Brookfield", pct: 3.0 }, { name: "CPKC", pct: 2.8 }, { name: "Suncor", pct: 2.7 }, { name: "CNQ", pct: 2.5 }],
    top10Pct: 44.8
  },
  {
    ticker: "VCN.TO", name: "Vanguard FTSE Canada All Cap", provider: "Vanguard", market: "Canada", type: "standard",
    mer: "0.06%", return1y: "33.5%", return5y: "15.0%",
    lean: "Broader — includes mid/small caps. Lowest MER of Canadian ETFs.",
    countries: [{ name: "Canada", pct: 100 }],
    sectors: [{ name: "Financials", pct: 38 }, { name: "Energy", pct: 18 }, { name: "Materials", pct: 13 }, { name: "Technology", pct: 10 }, { name: "Industrials", pct: 9 }, { name: "Other", pct: 12 }],
    top10: [{ name: "RBC", pct: 7.6 }, { name: "TD Bank", pct: 5.4 }, { name: "Shopify", pct: 4.1 }, { name: "Enbridge", pct: 3.4 }, { name: "BMO", pct: 3.3 }, { name: "Brookfield", pct: 2.7 }, { name: "CNQ", pct: 2.6 }, { name: "Agnico Eagle", pct: 2.5 }, { name: "Suncor", pct: 2.4 }, { name: "CN Rail", pct: 2.3 }],
    top10Pct: 36.3
  },
  {
    ticker: "CACE.TO", name: "Avantis CIBC Canadian Equity", provider: "Avantis", market: "Canada", type: "tilted",
    mer: "0.38%", return1y: "31.2%", return5y: "13.0%",
    lean: "Broad Canadian equity with factor-oriented selection.",
    countries: [{ name: "Canada", pct: 100 }],
    sectors: [{ name: "Financials", pct: 40 }, { name: "Energy", pct: 18 }, { name: "Materials", pct: 13 }, { name: "Technology", pct: 9 }, { name: "Industrials", pct: 9 }, { name: "Other", pct: 11 }],
    top10: [{ name: "RBC", pct: 8.5 }, { name: "TD Bank", pct: 6.0 }, { name: "Shopify", pct: 4.5 }, { name: "Enbridge", pct: 3.5 }, { name: "BMO", pct: 3.2 }, { name: "Brookfield", pct: 2.8 }, { name: "CNQ", pct: 2.6 }, { name: "Suncor", pct: 2.4 }, { name: "CN Rail", pct: 2.2 }, { name: "Agnico Eagle", pct: 2.0 }],
    top10Pct: 37.7
  },
  {
    ticker: "CANL.TO", name: "Global X Enhanced TSX 60", provider: "Global X", market: "Canada", type: "leveraged",
    mer: "0.45%", return1y: "38.5%", return5y: "18.0%",
    lean: "1.25× daily leveraged Canadian large-caps. Amplifies gains and losses.",
    countries: [{ name: "Canada", pct: 100 }],
    sectors: [{ name: "Financials", pct: 43 }, { name: "Energy", pct: 17 }, { name: "Materials", pct: 12 }, { name: "Technology", pct: 8 }, { name: "Other", pct: 20 }],
    top10: [{ name: "RBC", pct: 10.3 }, { name: "TD Bank", pct: 7.2 }, { name: "Shopify", pct: 5.0 }, { name: "CN Rail", pct: 4.0 }, { name: "Enbridge", pct: 3.8 }, { name: "BMO", pct: 3.5 }, { name: "Brookfield", pct: 3.0 }, { name: "CPKC", pct: 2.8 }, { name: "Suncor", pct: 2.7 }, { name: "CNQ", pct: 2.5 }],
    top10Pct: 44.8
  },

  // === U.S. ===
  {
    ticker: "ZSP.TO", name: "BMO S&P 500 Index ETF", provider: "BMO", market: "U.S.", type: "standard",
    mer: "0.09%", return1y: "25.9%", return5y: "16.9%",
    lean: "Pure S&P 500 — holds U.S. stocks directly. Lowest MER in class.",
    countries: [{ name: "U.S.", pct: 100 }],
    sectors: [{ name: "Technology", pct: 37 }, { name: "Financials", pct: 13 }, { name: "Consumer Cyclical", pct: 10 }, { name: "Healthcare", pct: 9 }, { name: "Industrials", pct: 7 }, { name: "Communication", pct: 6 }, { name: "Consumer Defensive", pct: 5 }, { name: "Energy", pct: 3 }, { name: "Other", pct: 10 }],
    top10: [{ name: "Apple", pct: 7.0 }, { name: "Microsoft", pct: 6.5 }, { name: "NVIDIA", pct: 6.0 }, { name: "Amazon", pct: 3.5 }, { name: "Meta", pct: 2.5 }, { name: "Alphabet A", pct: 2.2 }, { name: "Alphabet C", pct: 2.0 }, { name: "Berkshire", pct: 1.7 }, { name: "Broadcom", pct: 1.5 }, { name: "Tesla", pct: 1.5 }],
    top10Pct: 34.4
  },
  {
    ticker: "VFV.TO", name: "Vanguard S&P 500 ETF", provider: "Vanguard", market: "U.S.", type: "standard",
    mer: "0.09%", return1y: "25.9%", return5y: "16.9%",
    lean: "Same S&P 500 exposure. Tied with ZSP on MER.",
    countries: [{ name: "U.S.", pct: 100 }],
    sectors: [{ name: "Technology", pct: 37 }, { name: "Financials", pct: 13 }, { name: "Consumer Cyclical", pct: 10 }, { name: "Healthcare", pct: 9 }, { name: "Industrials", pct: 7 }, { name: "Communication", pct: 6 }, { name: "Other", pct: 18 }],
    top10: [{ name: "Apple", pct: 7.0 }, { name: "Microsoft", pct: 6.5 }, { name: "NVIDIA", pct: 6.0 }, { name: "Amazon", pct: 3.5 }, { name: "Meta", pct: 2.5 }, { name: "Alphabet A", pct: 2.2 }, { name: "Alphabet C", pct: 2.0 }, { name: "Berkshire", pct: 1.7 }, { name: "Broadcom", pct: 1.5 }, { name: "Tesla", pct: 1.5 }],
    top10Pct: 34.4
  },
  {
    ticker: "XUS.TO", name: "iShares Core S&P 500 ETF", provider: "iShares", market: "U.S.", type: "standard",
    mer: "0.10%", return1y: "25.8%", return5y: "16.8%",
    lean: "Same S&P 500 index. Slightly higher MER than ZSP/VFV.",
    countries: [{ name: "U.S.", pct: 100 }],
    sectors: [{ name: "Technology", pct: 37 }, { name: "Financials", pct: 13 }, { name: "Consumer Cyclical", pct: 10 }, { name: "Healthcare", pct: 9 }, { name: "Industrials", pct: 7 }, { name: "Other", pct: 24 }],
    top10: [{ name: "Apple", pct: 7.0 }, { name: "Microsoft", pct: 6.5 }, { name: "NVIDIA", pct: 6.0 }, { name: "Amazon", pct: 3.5 }, { name: "Meta", pct: 2.5 }, { name: "Alphabet A", pct: 2.2 }, { name: "Alphabet C", pct: 2.0 }, { name: "Berkshire", pct: 1.7 }, { name: "Broadcom", pct: 1.5 }, { name: "Tesla", pct: 1.5 }],
    top10Pct: 34.4
  },
  {
    ticker: "CAUS.TO", name: "Avantis CIBC U.S. All-Cap", provider: "Avantis", market: "U.S.", type: "tilted",
    mer: "0.38%", return1y: "26.5%", return5y: "17.5%",
    lean: "Broader U.S. equity with factor tilts — includes mid/small caps.",
    countries: [{ name: "U.S.", pct: 100 }],
    sectors: [{ name: "Technology", pct: 32 }, { name: "Financials", pct: 15 }, { name: "Consumer Cyclical", pct: 11 }, { name: "Healthcare", pct: 10 }, { name: "Industrials", pct: 9 }, { name: "Other", pct: 23 }],
    top10: [{ name: "Apple", pct: 6.0 }, { name: "Microsoft", pct: 5.5 }, { name: "NVIDIA", pct: 5.0 }, { name: "Amazon", pct: 3.0 }, { name: "Meta", pct: 2.2 }, { name: "Alphabet", pct: 3.5 }, { name: "Berkshire", pct: 1.5 }, { name: "Broadcom", pct: 1.3 }, { name: "JPMorgan", pct: 1.2 }, { name: "Tesla", pct: 1.1 }],
    top10Pct: 30.3
  },
  {
    ticker: "USSL.TO", name: "Global X Enhanced S&P 500", provider: "Global X", market: "U.S.", type: "leveraged",
    mer: "0.45%", return1y: "32.5%", return5y: "19.5%",
    lean: "1.25× daily leveraged S&P 500. Amplifies gains and losses.",
    countries: [{ name: "U.S.", pct: 100 }],
    sectors: [{ name: "Technology", pct: 37 }, { name: "Financials", pct: 13 }, { name: "Consumer Cyclical", pct: 10 }, { name: "Other", pct: 40 }],
    top10: [{ name: "Apple", pct: 7.0 }, { name: "Microsoft", pct: 6.5 }, { name: "NVIDIA", pct: 6.0 }, { name: "Amazon", pct: 3.5 }, { name: "Meta", pct: 2.5 }, { name: "Alphabet A", pct: 2.2 }, { name: "Alphabet C", pct: 2.0 }, { name: "Berkshire", pct: 1.7 }, { name: "Broadcom", pct: 1.5 }, { name: "Tesla", pct: 1.5 }],
    top10Pct: 34.4
  }
];

// Dividend ETF comparison data — sourced from fund facts as of Jul/Aug 2026
// trailing: 12-month trailing yield | projYield: distribution yield (forward-looking proxy)
// return5y: annualized 5-year total return, normally already net of fees and inclusive of distributions
const dividendEtfs = [
  {
    ticker: "VDY",
    name: "Vanguard FTSE Canadian High Dividend Yield",
    mer: 0.22,
    trailingYield: 3.04,
    projYield: 3.04,
    return5y: 19.59,
    top10Pct: 69.4,
    numStocks: 60,
    canada: 100,
    usa: 0,
    intl: 0,
    source: "Vanguard Canada | Jun 30, 2026"
  },
  {
    ticker: "XDIV",
    name: "iShares Core MSCI Canadian Quality Dividend",
    mer: 0.11,
    trailingYield: 3.07,
    projYield: 3.10,
    return5y: 19.97,
    top10Pct: 75.2,
    numStocks: 21,
    canada: 99.8,
    usa: 0,
    intl: 0,
    source: "BlackRock Canada | Aug 4, 2026"
  },
  {
    ticker: "XEI",
    name: "iShares S&P/TSX Composite High Dividend",
    mer: 0.22,
    trailingYield: 3.39,
    projYield: 3.40,
    return5y: 16.85,
    top10Pct: 45.3,
    numStocks: 75,
    canada: 100,
    usa: 0,
    intl: 0,
    source: "BlackRock Canada | Aug 4, 2026"
  },
  {
    ticker: "HDIV",
    name: "Hamilton Enhanced Canadian Covered Call (1.25× leveraged)",
    mer: 0,
    trailingYield: 9.99,
    projYield: 9.99,
    return5y: 18.40,
    top10Pct: 20,
    numStocks: 8,
    canada: 100,
    usa: 0,
    intl: 0,
    source: "Hamilton ETFs | Jul 31, 2026"
  },
  {
    ticker: "HYLD",
    name: "Hamilton Enhanced U.S. Covered Call (1.25× leveraged)",
    mer: 0,
    trailingYield: 12.82,
    projYield: 12.82,
    return5y: 20.50,
    top10Pct: 20,
    numStocks: 8,
    canada: 0,
    usa: 100,
    intl: 0,
    source: "Hamilton ETFs | 3-year annualized return, Jul 31, 2026"
  }
];

let pieMode = 'countries';

// Consistent country colors: Canada=red, US=blue
const countryColors = {
  "Canada": "#ff4444", "U.S.": "#4488ff", "Japan": "#ffaa00",
  "U.K.": "#aa44ff", "China": "#ff6644", "France": "#44aaff",
  "Germany": "#ffcc00", "Switzerland": "#ff4488", "Australia": "#44ff88",
  "Netherlands": "#ff8844", "Other": "#888888"
};

const pieColors = ['#53e6a0','#6aa8ff','#ffd166','#ff8fab','#b892ff','#ff9f43','#54a0ff','#5f27cd','#01a3a4','#f368e0','#ff6348','#7bed9f','#70a1ff','#ffa502','#eccc68'];

function getColor(items, i, isCountries) {
  if (isCountries && items[i].name in countryColors) return countryColors[items[i].name];
  return pieColors[i % pieColors.length];
}

// Best standard ETF among International only
function computeBestStandard() {
  const standards = etfsFlat.filter(e => e.type === 'standard' && e.market === 'World');
  const scored = standards.map(e => ({ ...e, score: parseFloat(e.return1y) / parseFloat(e.mer) }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].ticker;
}
const bestStandardTicker = computeBestStandard();

function renderLevGrid() {
  const grid = document.getElementById("levGrid");
  if (!grid) return;
  const leveraged = [
    ...etfsFlat.filter(e => e.type === 'leveraged'),
    ...dividendEtfs.filter(e => e.ticker === 'HDIV' || e.ticker === 'HYLD').map(e => ({ ...e, type: 'leveraged' }))
  ];
  grid.innerHTML = `
    <h3 style="margin:0 0 6px;">1.25× covered-call and equity ETFs</h3>
    <p style="margin:0 0 18px; color:var(--muted);">These examples use approximately 1.25× leverage. HDIV and HYLD also use covered-call strategies and are designed for monthly income. Leverage can increase losses, and covered calls can limit some upside.</p>
    <div class="etf-cards">
      ${leveraged.map(etf => `
        <article class="etf-card high-lev">
          <div class="etf-card-head"><span class="ticker">${etf.ticker.replace('.TO', '')}</span><span class="etf-lev-tag">1.25×</span></div>
          <h3>${etf.name}</h3>
          <div class="etf-card-metrics">
            <span class="etf-metric">MER <strong>${etf.mer}</strong></span>
            <span class="etf-metric">5Y/3Y <strong>${etf.return5y}%</strong></span>
            <span class="etf-metric">Yield <strong>${etf.projYield}%</strong></span>
          </div>
          <p class="etf-lean">${etf.lean || (etf.ticker === 'HDIV' || etf.ticker === 'HYLD' ? 'Covered-call strategy with approximately 1.25× leverage. Review the fund facts and prospectus.' : 'Leverage increases risk. Review the fund facts and prospectus.')}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function renderEtfLearningMatrix() {
  const matrix = document.getElementById('etfLearningMatrix');
  const controls = document.getElementById('etfMatrixControls');
  if (!matrix || !controls) return;
  const funds = {
    XIU:['XIU','iShares S&P/TSX 60 Index ETF','Canada','Growth','1×','~3%','Canadian large-cap sectors','Compare ZIU or VCN.'],
    CNCC:['CNCC','Global X S&P/TSX 60 Covered Call ETF','Canada','Income','1×','Variable','Canadian equities plus covered calls','Compare XEI or VDY.'],
    HCAL:['HCAL','Hamilton Enhanced Canadian Bank ETF','Canada','Leveraged growth','1.25×','Variable','Canadian banks; concentrated','Compare XIU or VCN for broader exposure.'],
    HDIV:['HDIV','Hamilton Enhanced Canadian Covered Call ETF','Canada','Leveraged income','1.25×','Variable monthly','Canadian covered-call ETFs; approximately 25% cash leverage','Compare CNCC, XEI, or HYLD.'],
    VFV:['VFV','Vanguard S&P 500 ETF','United States','Growth','1×','~1%','U.S. large-cap sectors','Compare ZSP or XUS.'],
    SMAX:['SMAX','Hamilton U.S. Equity Yield Maximizer ETF','United States','Income','1×','Variable','U.S. equities plus covered calls','Compare VFV or other U.S. income ETFs.'],
    HSU:['HSU','BetaPro S&P 500 2× Daily Bull ETF','United States','Leveraged growth','2× reference only','Not income-focused','S&P 500 daily target; daily reset','For calmer exposure, compare VFV or ZSP.'],
    HYLD:['HYLD','Hamilton Enhanced U.S. Covered Call ETF','United States','Leveraged income','1.25×','Variable monthly','U.S. covered-call ETFs; approximately 25% cash leverage','Compare SMAX, VFV, or HDIV.'],
    XEQT:['XEQT','iShares Core Equity ETF Portfolio','International / Global','Growth','1×','~2%','Canada, U.S., and international equities','Compare VEQT or ZEQT.'],
    IMAX:['IMAX','Hamilton International Equity Yield Maximizer ETF','International / Global','Income','1×','Variable','International equities plus covered calls','Compare XEQT or other international income ETFs.'],
    HEQL:['HEQL','Global X Enhanced All-Equity ETF','International / Global','Leveraged growth','1.25×','Variable','Global all-equity; daily leverage','Compare XEQT or VEQT.'],
    EQCL:['EQCL','Global X Enhanced Covered Call All-Equity ETF','International / Global','Leveraged income','1.25×','Variable monthly','Global covered-call ETFs and leverage','Compare XEQT, IMAX, HDIV, or HYLD.']
  };
  const rows = [['Canada',['XIU','CNCC','HCAL','HDIV']],['United States',['VFV','SMAX',null,'HYLD']],['International / Global',['XEQT','IMAX','HEQL','EQCL']]];
  let metric = 'yield';
  const actualMetrics = {
    XIU:{yield:'2.17%',mer:'0.18%',totalReturn:'14.41% (5Y annualized)',asOf:'Aug 10, 2026',source:'iShares / Yahoo Finance'},
    VFV:{yield:'0.85%',mer:'0.09%',totalReturn:'21.44% (5Y annualized)',asOf:'Jul 31, 2026',source:'Vanguard Canada'},
    XEQT:{yield:'1.60%',mer:'0.20%',totalReturn:'Not shown in the retrieved provider summary',asOf:'Aug 12, 2026',source:'BlackRock Canada / Yahoo Finance'},
    CNCC:{yield:'6.61%',mer:'0.62%',totalReturn:'Not available in the retrieved provider summary',asOf:'Aug 12, 2026',source:'Global X Canada'},
    HCAL:{yield:'3.35%',mer:'0.82%',totalReturn:'24.4% (5Y annualized)',asOf:'Jul 31, 2026',source:'Hamilton ETFs'},
    HDIV:{yield:'9.99%',mer:'0.00% top-level*',totalReturn:'18.4% (5Y annualized)',asOf:'Jul 31, 2026',source:'Hamilton ETFs'},
    SMAX:{yield:'10.79%',mer:'Not shown in the retrieved provider summary',totalReturn:'25.1% (annualized since inception)',asOf:'Jul 31, 2026',source:'Hamilton ETFs'},
    HYLD:{yield:'12.82%',mer:'0.00% top-level*',totalReturn:'20.5% (3Y annualized)',asOf:'Jul 31, 2026',source:'Hamilton ETFs'},
    IMAX:{yield:'Not published yet',mer:'Not shown in the retrieved provider summary',totalReturn:'Not published yet (<1 year)',asOf:'Aug 12, 2026',source:'Hamilton ETFs'},
    HEQL:{yield:'1.97%',mer:'1.40%',totalReturn:'Not shown in the retrieved provider summary',asOf:'Aug 12, 2026',source:'Global X Canada'},
    EQCL:{yield:'10.90%',mer:'1.70%',totalReturn:'Not shown in the retrieved provider summary',asOf:'Aug 12, 2026',source:'Global X Canada'},
    HSU:{yield:'Not an income focus',mer:'Not shown in the retrieved provider summary',totalReturn:'Reference only',asOf:'Not displayed',source:'Not used in the live matrix'}
  };
  controls.innerHTML = '<div class="etf-matrix-toggle" role="group" aria-label="Primary ETF metric"><button type="button" class="active" data-matrix-metric="yield">Distribution yield</button><button type="button" data-matrix-metric="return">Historical total return</button></div>';
  const card = ticker => { if (!ticker) return '<div class="etf-matrix-card is-empty"><small>Rare category — no beginner example shown</small></div>'; const f=funds[ticker]; const leveraged=f[4] !== '1×'; const alert=leveraged ? '<span class="matrix-alert" aria-hidden="true">⚠</span>' : ''; const m=actualMetrics[ticker] || {}; const value=metric==='yield' ? (m.yield || f[5]) : (m.totalReturn || 'Review current fund facts'); return `<button class="etf-matrix-card${leveraged?' is-leveraged':''}" type="button" data-etf-ticker="${ticker}" aria-label="View details for ${ticker}, ${f[1]}${leveraged?', leveraged product warning':''}">${alert}<strong>${ticker}</strong><small>${f[1]}</small><span class="matrix-metric">${value}${leveraged ? ` · ${f[4]}` : ''}</span></button>`; };
  const render = () => { matrix.innerHTML=`<div class="etf-learning-grid"><div class="etf-learning-head">Geography</div><div class="etf-learning-head">Growth<br><small>No covered calls</small></div><div class="etf-learning-head">Income<br><small>Covered calls</small></div><div class="etf-learning-head">Leveraged growth</div><div class="etf-learning-head">Leveraged income</div>${rows.map(([geo,t])=>`<div class="etf-learning-row-label">${geo}</div>${t.map(card).join('')}`).join('')}</div>`; matrix.querySelectorAll('[data-etf-ticker]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.etfTicker))); };
  const openModal = ticker => { const f=funds[ticker]; const m=actualMetrics[ticker] || {yield:f[5],mer:'Not verified',totalReturn:'Not verified',asOf:'Not verified',source:'Not verified'}; document.getElementById('etfModalTitle').textContent=`${f[0]} — ${f[1]}`; document.getElementById('etfModalWhy').textContent=`${f[1]} is a ${f[3].toLowerCase()} example for ${f[2]} exposure. Review the structure, risk, fees, and current fund facts before choosing.`; document.getElementById('etfModalMetrics').innerHTML=`<div><small>Distribution yield</small><strong>${m.yield}</strong></div><div><small>MER</small><strong>${m.mer}</strong></div><div><small>Historical total return</small><strong>${m.totalReturn}</strong></div><div><small>Leverage</small><strong>${f[4]}</strong></div><div><small>As of</small><strong>${m.asOf}</strong></div><div><small>Source</small><strong>${m.source}</strong></div>`; document.getElementById('etfModalComposition').innerHTML=`<ul><li>${f[6]}</li><li>Check provider holdings and current distribution composition</li></ul>`; document.getElementById('etfModalAlternatives').textContent=f[7]; const flow=document.getElementById('etfModalFlow'); flow.hidden=!['HDIV','HYLD','EQCL','HEQL'].includes(ticker); flow.innerHTML=flow.hidden?'':'<strong>Composition flow</strong><div class="etf-flow-bar"><span>Investor capital</span><span>→ ETF</span></div><div class="etf-flow-bar"><span>Leverage and/or covered calls</span><span>→ underlying ETFs</span></div><div class="etf-flow-bar"><span>Underlying equities</span><span>→ market returns and distributions</span></div>'; document.getElementById('etfModal').hidden=false; document.querySelector('.etf-modal-close').focus(); };
  controls.querySelectorAll('[data-matrix-metric]').forEach(b=>b.addEventListener('click',()=>{metric=b.dataset.matrixMetric; controls.querySelectorAll('[data-matrix-metric]').forEach(x=>x.classList.toggle('active',x===b)); render();}));
  document.querySelectorAll('[data-close-etf-modal]').forEach(e=>e.addEventListener('click',()=>{document.getElementById('etfModal').hidden=true;}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') document.getElementById('etfModal').hidden=true;}); render();
}

// Color scales: bottom 30% = bright red, middle 40% = yellow, top 30% = bright green
function tierColor(val, vals, invert) {
  if (vals.length < 2) return 'var(--green)';
  const min = Math.min(...vals), max = Math.max(...vals);
  if (max === min) return 'var(--green)';
  const t = (val - min) / (max - min);
  const tAdj = invert ? (1 - t) : t;
  if (tAdj <= 0.3) {
    // Red to yellow: red channel stays 255, green goes 0→210
    const s = tAdj / 0.3;
    return `rgb(255,${Math.round(210*s)},60)`;
  } else if (tAdj >= 0.7) {
    // Yellow to green: red channel goes 255→0, green stays 210→255
    const s = (tAdj - 0.7) / 0.3;
    return `rgb(${Math.round(255*(1-s))},${Math.round(210+45*s)},60)`;
  } else {
    return `rgb(255,210,60)`;
  }
}
function merColor(merStr, group) {
  const vals = group.map(e => parseFloat(e.mer)).filter(v => !isNaN(v));
  return tierColor(parseFloat(merStr), vals, true);
}
function returnColor(retStr, group) {
  const vals = group.map(e => parseFloat(e.return1y)).filter(v => !isNaN(v));
  return tierColor(parseFloat(retStr), vals, false);
}
function return5yColor(retStr, group) {
  const vals = group.map(e => parseFloat(e.return5y)).filter(v => !isNaN(v));
  return tierColor(parseFloat(retStr), vals, false);
}

function buildPieConic(items, total, isCountries) {
  let cumulative = 0;
  return items.map((item, i) => {
    const start = cumulative;
    const pct = total ? (item.pct / total * 100) : item.pct;
    cumulative += pct;
    return `${getColor(items, i, isCountries)} ${start.toFixed(1)}% ${cumulative.toFixed(1)}%`;
  }).join(', ');
}

function buildPieTooltip(items, total, isCountries) {
  return items.map((item, i) => {
    const pct = total ? (item.pct / total * 100).toFixed(1) : item.pct.toFixed(1);
    return `<span style="color:${getColor(items,i,isCountries)}">●</span> ${item.name}: ${pct}%`;
  }).join('<br>');
}

function renderPieChart(etf) {
  let items, total;
  const isCountries = pieMode === 'countries';
  if (isCountries) { items = etf.countries; total = null; }
  else if (pieMode === 'sectors') { items = etf.sectors; total = null; }
  else { items = etf.top10; total = 100; }
  return `<div class="etf-pie" style="background: conic-gradient(${buildPieConic(items, total, isCountries)});" data-tooltip="${buildPieTooltip(items, total, isCountries).replace(/"/g, '&quot;')}"></div>`;
}

function totalScore(etf) {
  return (parseFloat(etf.return5y) - 5 * parseFloat(etf.mer)).toFixed(1);
}

function renderEtfCell(etf, group) {
  const isBest = etf.ticker === bestStandardTicker && etf.type === 'standard' && etf.market === 'World';
  const isBestLev = etf.type === 'leveraged' && etf.market === 'World';
  const score = totalScore(etf);
  const scores = group.length ? group.map(e => parseFloat(totalScore(e))) : [parseFloat(score)];
  const scoreColor = tierColor(parseFloat(score), scores, false);
  const displayTicker = etf.ticker.replace('.TO', '');
  return `
    <article class="etf-cell-card ${etf.type}${isBest ? ' etf-best' : ''}${isBestLev ? ' etf-best-lev' : ''}">
      ${isBest ? `<span class="etf-best-star" title="Best international standard ETF">★</span>` : ''}
      ${isBestLev ? `<span class="etf-best-star etf-best-lev-star" title="Recommended: 1.25× global all-equity with moderate leverage">★</span>` : ''}
      <div class="etf-cell-head">
        <span class="ticker">${displayTicker}</span>
      </div>
      <h3>${etf.name}</h3>
      <div class="etf-cell-metrics">
        <span class="etf-metric">MER <strong>${etf.mer}</strong></span>
        <span class="etf-metric">5Y <strong>${etf.return5y}</strong></span>
        <span class="etf-metric">Net <strong style="color:${scoreColor}">${score}%</strong></span>
      </div>
      ${renderPieChart(etf)}
      <p class="etf-lean">${etf.lean}</p>
    </article>
  `;
}

function renderTickers() {
  const grid = document.getElementById("tickerGrid");
  grid.classList.add("etf-grid");

  const byProvider = (provider) => etfsFlat.filter(e => e.provider === provider && e.type === 'standard');
  const bmo = byProvider('BMO');
  const ishares = byProvider('iShares');
  const vanguard = byProvider('Vanguard');
  const tilted = etfsFlat.filter(e => e.type === 'tilted');
  const leveraged = etfsFlat.filter(e => e.type === 'leveraged');

  function cell(etfs, market) {
    const e = etfs.find(x => x.market === market);
    const colGroup = etfsFlat.filter(x => x.market === market && x.type !== 'leveraged');
    return e ? renderEtfCell(e, colGroup) : '<div class="etf-cell-card empty"></div>';
  }
  function tiltedCell(market) {
    const e = tilted.find(x => x.market === market);
    const colGroup = etfsFlat.filter(x => x.market === market && x.type !== 'leveraged');
    return e ? renderEtfCell(e, colGroup) : '<div class="etf-cell-card empty"></div>';
  }
  function levCell(market) {
    const e = leveraged.find(x => x.market === market);
    return e ? renderEtfCell(e, []) : '<div class="etf-cell-card empty"></div>';
  }

  grid.innerHTML = `
    <div class="etf-grid-controls">
      <div class="pie-mode-toggle" role="group" aria-label="Pie chart view">
        <button class="button ghost compact pie-mode-btn active" data-mode="countries">Countries</button>
        <button class="button ghost compact pie-mode-btn" data-mode="sectors">Industries</button>
        <button class="button ghost compact pie-mode-btn" data-mode="top10">Top 10 Stocks</button>
      </div>
    </div>
    <div class="etf-table">
      <div class="etf-table-hdr"><span></span><span>World</span><span>Canada <small>Like a double-double — reliable, comfortable, and very Canadian.</small></span><span>U.S.</span></div>
      <div class="etf-table-row">
        <div class="etf-row-label"><span>Standard — BMO</span></div>
        ${cell(bmo, 'World')}${cell(bmo, 'Canada')}${cell(bmo, 'U.S.')}
      </div>
      <div class="etf-table-row">
        <div class="etf-row-label"><span>Standard — iShares</span></div>
        ${cell(ishares, 'World')}${cell(ishares, 'Canada')}${cell(ishares, 'U.S.')}
      </div>
      <div class="etf-table-row">
        <div class="etf-row-label"><span>Standard — Vanguard</span></div>
        ${cell(vanguard, 'World')}${cell(vanguard, 'Canada')}${cell(vanguard, 'U.S.')}
      </div>
      <div class="etf-table-row">
        <div class="etf-row-label"><span>Factor ETFs</span></div>
        ${tiltedCell('World')}${tiltedCell('Canada')}${tiltedCell('U.S.')}
      </div>
    </div>
  `;

  grid.querySelectorAll('.pie-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.pie-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pieMode = btn.dataset.mode;
      renderTickers();
    });
  });

  grid.querySelectorAll('.etf-pie').forEach(pie => {
    const tooltip = pie.dataset.tooltip;
    if (!tooltip) return;
    let tipEl = null;
    pie.addEventListener('mouseenter', () => {
      tipEl = document.createElement('div');
      tipEl.className = 'etf-pie-tooltip';
      tipEl.innerHTML = tooltip;
      document.body.appendChild(tipEl);
      const rect = pie.getBoundingClientRect();
      tipEl.style.left = rect.left + rect.width / 2 + 'px';
      tipEl.style.top = rect.top - 8 + 'px';
    });
    pie.addEventListener('mouseleave', () => { if (tipEl) { tipEl.remove(); tipEl = null; } });
  });
}


function renderDividendTable() {
  const grid = document.getElementById("dividendTableBody");
  if (!grid) return;

  let sortCol = null;
  let sortDir = 1;

  function render(data) {
    grid.innerHTML = data.map(etf => {
      const roiTotal = etf.return5y;
      const pct = (v) => `${v.toFixed(1)}%`;
      return `
        <tr>
          <td class="div-ticker"><span class="ticker-pill">${etf.ticker}</span></td>
          <td class="div-name">${etf.name}</td>
          <td class="div-num">${pct(etf.trailingYield)}</td>
          <td class="div-num">${pct(etf.projYield)}</td>
          <td class="div-num">${pct(etf.return5y)}</td>
          <td class="div-num div-mer">${etf.mer.toFixed(2)}%</td>
          <td class="div-num div-roi" data-value="${roiTotal.toFixed(2)}"><strong>${roiTotal.toFixed(1)}%</strong></td>
          <td class="div-num">${pct(etf.top10Pct)}</td>
          <td class="div-num">${etf.numStocks}</td>
          <td class="div-num">${pct(etf.canada)}</td>
          <td class="div-num">${pct(etf.usa)}</td>
          <td class="div-num">${pct(etf.intl)}</td>
        </tr>
      `;
    }).join('');
  }

  function sort(key) {
    if (sortCol === key) { sortDir *= -1; } else { sortCol = key; sortDir = 1; }
    const sorted = [...dividendEtfs].sort((a, b) => {
      let va, vb;
      if (key === 'name' || key === 'ticker') {
        va = a[key]; vb = b[key];
        return sortDir * va.localeCompare(vb);
      }
      if (key === 'roi') { va = a.return5y; vb = b.return5y; }
      else { va = a[key]; vb = b[key]; }
      return sortDir * (va - vb);
    });
    document.querySelectorAll('#dividendTable thead th').forEach(th => th.classList.remove('sorted-asc', 'sorted-desc'));
    const th = document.querySelector(`#dividendTable thead th[data-sort="${key}"]`);
    if (th) th.classList.add(sortDir === 1 ? 'sorted-asc' : 'sorted-desc');
    render(sorted);
  }

  const thead = document.getElementById("dividendTable").querySelector("thead");
  if (thead) {
    thead.querySelectorAll("th[data-sort]").forEach(th => {
      th.addEventListener("click", () => sort(th.dataset.sort));
    });
  }

  render(dividendEtfs);
}

const frequencies = [
  { key: "daily", label: "Daily DCA", contributions: 260, color: "#53e6a0" },
  { key: "weekly", label: "Weekly DCA", contributions: 52, color: "#6aa8ff" },
  { key: "biweekly", label: "Biweekly DCA", contributions: 26, color: "#ffd166" },
  { key: "monthly", label: "Monthly DCA", contributions: 12, color: "#b892ff" },
  { key: "quarterly", label: "Quarterly DCA", contributions: 4, color: "#ff8fab" }
];

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
let chart;
let marketMoves = [];
let nextMoveId = 1;
let benchmarkKey = "daily";

const marketScenarios = {
  neutral: { growth: 0, variation: 0, moves: [] },
  rising: { growth: 8, variation: 0.5, moves: [] },
  "early-dip": { growth: 6, variation: 0.5, moves: [{ startDay: 35, height: -18, width: 35, recovers: true }] },
  "late-dip": { growth: 6, variation: 0.5, moves: [{ startDay: 260, height: -18, width: 35, recovers: false }] },
  sideways: { growth: 0, variation: 2, moves: [{ startDay: 80, height: -10, width: 25, recovers: true }, { startDay: 210, height: 10, width: 25, recovers: true }] },
  bearish: { growth: -8, variation: 1, moves: [{ startDay: 70, height: -12, width: 30, recovers: false }, { startDay: 220, height: -10, width: 30, recovers: false }] }
};

function money(value) {
  return fmt.format(value);
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (Number.isNaN(number)) return min;
  return Math.min(max, Math.max(min, number));
}

function formatPct(value) {
  return `${value > 0 ? "+" : ""}${value}%`;
}

function renderDipList() {
  const list = document.getElementById("dipList");
  if (!marketMoves.length) {
    list.innerHTML = `<p class="empty-dips">No market scenarios added yet. Add a dip or rally to test timing.</p>`;
    return;
  }

  list.innerHTML = marketMoves.map(move => {
    const bottomDay = Math.min(365, move.startDay + move.width);
    const recoveryDay = move.recovers ? Math.min(365, bottomDay + move.width) : null;
    const pathText = move.recovers
      ? `starts day ${move.startDay}, moves ${formatPct(move.height)} by day ${bottomDay}, recovers by day ${recoveryDay}`
      : `starts day ${move.startDay}, moves ${formatPct(move.height)} by day ${bottomDay}, stays there`;
    return `
      <div class="dip-pill" data-move-id="${move.id}">
        <span>${pathText}</span>
        <button type="button" aria-label="Remove market move ${move.id}" data-remove-move="${move.id}">Remove</button>
      </div>
    `;
  }).join("");

  list.querySelectorAll("[data-remove-move]").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.removeMove);
      marketMoves = marketMoves.filter(move => move.id !== id);
      updateChart();
    });
  });
}

function applyScenario(name) {
  const editor = document.getElementById("dipEditor");
  document.querySelectorAll("[data-scenario]").forEach(button => button.classList.toggle("active", button.dataset.scenario === name));
  if (name === "custom") {
    if (editor) editor.open = true;
    return;
  }
  const scenario = marketScenarios[name] || marketScenarios.neutral;
  marketMoves = scenario.moves.map((move, index) => ({ id: index + 1, ...move }));
  nextMoveId = marketMoves.length + 1;
  document.getElementById("growth").value = scenario.growth;
  document.getElementById("variation").value = scenario.variation;
  if (editor) editor.open = false;
  updateChart();
}

function addMarketMove() {
  const move = {
    id: nextMoveId,
    startDay: clampNumber(document.getElementById("dipStart").value, 0, 365),
    height: clampNumber(document.getElementById("dipHeight").value, -30, 30),
    width: clampNumber(document.getElementById("dipWidth").value, 1, 365),
    recovers: document.getElementById("dipRecover").checked
  };
  nextMoveId += 1;
  marketMoves.push(move);
  updateChart();
}

function clearMarketMoves() {
  marketMoves = [];
  updateChart();
}

function resetNeutralScenario() {
  applyScenario("neutral");
}

function setOutputs() {
  const recurringAmount = +document.getElementById("recurring").value;
  const annualTotal = recurringAmount * 5 * 52;
  const fields = [
    ["recurring", v => money(+v)],
    ["growth", v => `${+v > 0 ? "+" : ""}${v}%`],
    ["variation", v => `${v}%`],
    ["dipHeight", v => `${+v > 0 ? "+" : ""}${v}%`]
  ];
  fields.forEach(([id, render]) => {
    document.getElementById(`${id}Out`).value = render(document.getElementById(id).value);
  });
  document.getElementById("capitalOut").value = money(annualTotal);
}

function moveFactor(day, startDay, bottomDay, recoverDay, move) {
  if (day < startDay) return 1;
  const bottomFactor = 1 + move;

  if (day <= bottomDay) {
    const span = Math.max(1, bottomDay - startDay);
    const t = (day - startDay) / span;
    return 1 + move * t;
  }

  if (recoverDay === null || day >= recoverDay) return recoverDay === null ? bottomFactor : 1;

  const span = Math.max(1, recoverDay - bottomDay);
  const t = (day - bottomDay) / span;
  return bottomFactor + (1 - bottomFactor) * t;
}

function marketMoveFactor(day, move) {
  const startDay = clampNumber(move.startDay, 0, 365);
  const width = clampNumber(move.width, 1, 365);
  const bottomDay = Math.min(365, startDay + width);
  const recoveryDay = move.recovers ? Math.min(365, bottomDay + width) : null;
  return moveFactor(day, startDay, bottomDay, recoveryDay, clampNumber(move.height, -30, 30) / 100);
}

function seededDailyMove(day) {
  const raw = Math.sin(day * 12.9898 + 78.233) * 43758.5453;
  return (raw - Math.floor(raw)) * 2 - 1;
}

function dailyVariationFactors(totalDays, variationPct) {
  const factors = [1];
  let cumulative = 1;

  for (let day = 1; day <= totalDays; day += 1) {
    cumulative *= 1 + (seededDailyMove(day) * variationPct / 100);
    factors.push(cumulative);
  }

  const endFactor = factors.at(-1);
  return factors.map((factor, day) => factor / Math.pow(endFactor, day / totalDays));
}

function buildPrices() {
  const growth = +document.getElementById("growth").value / 100;
  const variation = +document.getElementById("variation").value;
  const totalDays = 365;
  const startPrice = 100;
  const variationFactors = dailyVariationFactors(totalDays, variation);
  const prices = [];

  for (let day = 0; day <= totalDays; day += 1) {
    const annualGrowthFactor = Math.pow(1 + growth, day / totalDays);
    const customMoveFactor = marketMoves.reduce((factor, move) => factor * marketMoveFactor(day, move), 1);
    const price = startPrice * annualGrowthFactor * customMoveFactor * variationFactors[day];
    prices.push(price);
  }
  return prices;
}

function contributionDays(count, totalDays) {
  if (count === 1) return [0];
  const interval = totalDays / count;
  return Array.from({ length: count }, (_, i) => Math.min(totalDays, Math.round(i * interval)));
}

function simulateSchedule(prices, frequency) {
  const recurringAmount = +document.getElementById("recurring").value;
  const annualTotal = recurringAmount * 5 * 52;
  const installment = annualTotal / frequency.contributions;
  const days = contributionDays(frequency.contributions, prices.length - 1);
  const contributionSet = new Set(days);
  let shares = 0;
  const values = [];

  prices.forEach((price, day) => {
    if (contributionSet.has(day)) {
      shares += installment / price;
    }
    values.push(shares * price);
  });

  return { ...frequency, values, shares, installment, contributions: days.length, end: values.at(-1) };
}

function simulate() {
  const prices = buildPrices();
  const schedules = frequencies.map(freq => simulateSchedule(prices, freq));
  return { prices, schedules };
}

function renderDailyTable(result) {
  const headers = ["Day", ...result.schedules.map(schedule => schedule.label.replace(" DCA", ""))];
  const rows = result.prices.map((_, day) => `
    <tr>
      <th scope="row">${day}</th>
      ${result.schedules.map(schedule => `<td>${money(schedule.values[day])}</td>`).join("")}
    </tr>
  `).join("");

  document.getElementById("dailyTable").innerHTML = `
    <table>
      <thead>
        <tr>${headers.map(header => `<th scope="col">${header}</th>`).join("")}</tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function setBenchmark(key) {
  benchmarkKey = key;
  updateChart();
}

function updateChart() {
  setOutputs();
  renderDipList();
  const result = simulate();
  const labels = result.prices.map((_, i) => i);
  if (!result.schedules.some(schedule => schedule.key === benchmarkKey)) benchmarkKey = "daily";

  const data = {
    labels,
    datasets: result.schedules.map(schedule => ({
      label: schedule.label,
      data: schedule.values,
      borderColor: schedule.color,
      backgroundColor: `${schedule.color}22`,
      fill: schedule.key === benchmarkKey,
      tension: 0.25,
      pointRadius: 0,
      borderWidth: schedule.key === benchmarkKey ? 3 : 2
    }))
  };

  if (chart) {
    chart.data = data;
    chart.update();
  } else {
    chart = new Chart(document.getElementById("dcaChart"), {
      type: "line",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { color: "#f4f7fb", font: { weight: "700" } } },
          tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${money(ctx.parsed.y)}` } }
        },
        scales: {
          x: { title: { display: true, text: "Days", color: "#aebbd0" }, ticks: { color: "#aebbd0", maxTicksLimit: 8 }, grid: { color: "rgba(255,255,255,0.06)" } },
          y: { ticks: { color: "#aebbd0", callback: value => money(value) }, grid: { color: "rgba(255,255,255,0.08)" } }
        }
      }
    });
  }

  const benchmark = result.schedules.find(schedule => schedule.key === benchmarkKey) || result.schedules.find(schedule => schedule.key === "quarterly");
  document.getElementById("stats").innerHTML = `
    ${result.schedules.map(s => {
      const isBenchmark = s.key === benchmark.key;
      const diff = s.end - benchmark.end;
      const pct = benchmark.end === 0 ? 0 : (diff / benchmark.end * 100);
      const comparison = isBenchmark ? `<span class="benchmark-label">Baseline</span>` : `<span>${diff >= 0 ? "+" : ""}${pct.toFixed(1)}% vs ${benchmark.label.replace(" DCA", "")}</span>`;
      return `<button type="button" class="stat stat-button ${isBenchmark ? "selected" : diff >= 0 ? "good" : "warn"}" data-benchmark="${s.key}" aria-pressed="${isBenchmark}"><small>${s.label} (1 year)</small><strong>${money(s.end)} ${comparison}</strong></button>`;
    }).join("")}
  `;
  document.querySelectorAll("#stats [data-benchmark]").forEach(button => button.addEventListener("click", () => setBenchmark(button.dataset.benchmark)));

  renderDailyTable(result);
}

function renderDipList() {
  const list = document.getElementById("dipList");
  if (!marketMoves.length) {
    list.innerHTML = `<p class="empty-dips">No market scenarios added yet. Add a dip or rally to test timing.</p>`;
    return;
  }

  list.innerHTML = marketMoves.map(move => {
    const bottomDay = Math.min(365, move.startDay + move.width);
    const recoveryDay = move.recovers ? Math.min(365, bottomDay + move.width) : null;
    const pathText = move.recovers
      ? `starts day ${move.startDay}, moves ${formatPct(move.height)} by day ${bottomDay}, recovers by day ${recoveryDay}`
      : `starts day ${move.startDay}, moves ${formatPct(move.height)} by day ${bottomDay}, stays there`;
    return `
      <div class="dip-pill" data-move-id="${move.id}">
        <span>${pathText}</span>
        <button type="button" aria-label="Remove market move ${move.id}" data-remove-move="${move.id}">Remove</button>
      </div>
    `;
  }).join("");

  list.querySelectorAll("[data-remove-move]").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.removeMove);
      marketMoves = marketMoves.filter(move => move.id !== id);
      updateChart();
      renderDipList();
    });
  });
}

const tfsaLimits = {
  2009: 5000,
  2010: 5000,
  2011: 5000,
  2012: 5000,
  2013: 5500,
  2014: 5500,
  2015: 10000,
  2016: 5500,
  2017: 5500,
  2018: 5500,
  2019: 6000,
  2020: 6000,
  2021: 6000,
  2022: 6000,
  2023: 6500,
  2024: 7000,
  2025: 7000,
  2026: 7000
};


function calculateTfsaRoom() {
  const eligibilityYear = +document.getElementById("eligibilityYear").value;
  const contributed = +document.getElementById("tfsaContributed").value || 0;
  const withdrawals = +document.getElementById("tfsaWithdrawals").value || 0;
  const firstEligibleYear = Math.max(2009, eligibilityYear);
  const totalLimit = Object.entries(tfsaLimits)
    .filter(([year]) => +year >= firstEligibleYear)
    .reduce((sum, [, limit]) => sum + limit, 0);
  const estimatedRoom = Math.max(0, totalLimit + withdrawals - contributed);

  document.getElementById("tfsaResult").innerHTML = `
    <div class="stat good"><small>First eligible year</small><strong>${firstEligibleYear}</strong></div>
    <div class="stat"><small>Total possible room to 2026</small><strong>${money(totalLimit)}</strong></div>
    <div class="stat"><small>Estimated room remaining</small><strong>${money(estimatedRoom)}</strong></div>
    <p>Estimate only. Residency, previous withdrawals, overcontributions, and CRA adjustments can change your actual room.</p>
  `;
}

function init() {
  document.querySelectorAll("#dcaForm input, #dcaForm select").forEach(el => el.addEventListener("input", updateChart));
  document.getElementById("addDip").addEventListener("click", addMarketMove);
  document.getElementById("resetNeutral").addEventListener("click", resetNeutralScenario);
  document.querySelectorAll("[data-scenario]").forEach(button => button.addEventListener("click", () => applyScenario(button.dataset.scenario)));
  document.querySelectorAll("#tfsaForm input").forEach(el => el.addEventListener("input", calculateTfsaRoom));
    renderEtfLearningMatrix();
    updateChart();
  calculateTfsaRoom();
  renderCrossoverCalc();
  renderTargetCalc();
}

function renderCrossoverCalc() {
  const grid = document.getElementById("crossoverGrid");
  if (!grid) return;

  const growthOpts = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v =>
    `<option value="${v}">${v}%</option>`
  ).join("");

  grid.innerHTML = `
    <article class="crossover-card" id="crossCard1">
      <div class="crossover-num">1</div>
      <div>
        <h3>Growth overtakes your contributions</h3>
        <span id="crossYr1" class="crossover-yr" style="display:none"></span>
        <label class="cross-input-label">Growth assumption
          <select id="crossGrowth" class="cross-input" style="max-width:120px">
            <option value="">—</option>
            ${growthOpts}
          </select>
        </label>
        <p>Your monthly investment growth exceeds what you put in each month. Every dollar of growth is a dollar you did not have to earn and save yourself — your money is now doing the work.</p>
      </div>
    </article>
    <article class="crossover-card" id="crossCard2">
      <div class="crossover-num">2</div>
      <div>
        <h3>Growth overtakes your employment income</h3>
        <span id="crossYr2" class="crossover-yr" style="display:none"></span>
        <span id="crossErr2" class="crossover-yr error-label" style="display:none"></span>
        <label class="cross-input-label">Weekly contribution
          <input type="number" id="crossWeekly" class="cross-input" placeholder="e.g. 100" min="0" step="10" style="max-width:140px" />
        </label>
        <label class="cross-input-label">Annual employment income
          <input type="number" id="crossIncome" class="cross-input" placeholder="e.g. 60000" min="0" step="1000" />
        </label>
        <p>Your annual investment growth exceeds your yearly paycheque. At this point your portfolio earns more than your job — a true second income stream working alongside you.</p>
      </div>
    </article>
    <article class="crossover-card" id="crossCard3">
      <div class="crossover-num">3</div>
      <div>
        <h3>Investment income covers your living expenses</h3>
        <span id="crossYr3" class="crossover-yr" style="display:none"></span>
        <span id="crossErr3" class="crossover-yr error-label" style="display:none"></span>
        <label class="cross-input-label">Monthly living expenses
          <input type="number" id="crossExpenses" class="cross-input" placeholder="e.g. 3500" min="0" step="100" />
        </label>
        <p>Your monthly investment income exceeds your monthly costs — even after stress-testing with a 30% market drop. This is the crossover where work becomes optional. Your portfolio can support your life through good markets and bad.</p>
      </div>
    </article>
  `;

  // Attach listeners once — they only update results, never destroy inputs
  ["crossGrowth", "crossWeekly", "crossIncome", "crossExpenses"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(el.tagName === "SELECT" ? "change" : "input", updateCrossoverResults);
  });
}

function updateCrossoverResults() {
  const r = parseFloat((document.getElementById("crossGrowth") || {}).value) || 0;
  const weekly = parseFloat((document.getElementById("crossWeekly") || {}).value) || 0;
  const employmentIncome = parseFloat((document.getElementById("crossIncome") || {}).value) || 0;
  const monthlyExpenses = parseFloat((document.getElementById("crossExpenses") || {}).value) || 0;

  const M = weekly * 52 / 12;
  const i = r > 0 ? Math.pow(1 + r / 100, 1 / 12) - 1 : 0;
  const hasGrowth = r > 0;
  const hasWeekly = weekly > 0;
  const hasBase = hasGrowth && hasWeekly;
  const hasIncome = employmentIncome > 0;
  const hasExpenses = monthlyExpenses > 0;

  function yearsToTarget(targetBalance) {
    if (i <= 0 || M <= 0) return null;
    if (targetBalance <= 0) return 0;
    const ratio = 1 + targetBalance * i / M;
    if (ratio <= 1) return null;
    return Math.log(ratio) / Math.log(1 + i) / 12;
  }

  function fmtYears(y) {
    if (y === null || y === undefined) return "";
    if (y < 0.1) return "< 0.1 yr";
    if (y >= 99) return "99+ yr";
    return y.toFixed(1) + " yr";
  }

  function phaseError(phase) {
    if (phase === 1) return "";
    if (phase === 2) {
      if (hasIncome && !hasGrowth) return "enter growth rate in phase 1";
      if (hasIncome && hasGrowth && !hasWeekly) return "enter weekly contribution above";
      return "";
    }
    if (phase === 3) {
      if (hasExpenses && !hasGrowth) return "enter growth rate in phase 1";
      if (hasExpenses && hasGrowth && !hasWeekly) return "enter weekly contribution in phase 2";
      if (hasExpenses && hasBase && !hasIncome) return "enter employment income in phase 2";
      return "";
    }
    return "";
  }

  // Card 1
  const yr1 = hasGrowth && i > 0 ? Math.log(2) / Math.log(1 + i) / 12 : null;
  updateBadge("crossYr1", null, yr1, false, hasGrowth);

  // Card 2
  const yr2 = yearsToTarget(employmentIncome / (r / 100));
  updateBadge("crossYr2", "crossErr2", yr2, hasBase && hasIncome ? phaseError(2) : null, hasBase && hasIncome);

  // Card 3
  const yr3 = yearsToTarget(monthlyExpenses * 300);
  updateBadge("crossYr3", "crossErr3", yr3, hasBase && hasExpenses ? phaseError(3) : null, hasBase && hasExpenses);
}

function updateBadge(yrId, errId, years, hasErr, show) {
  const yrEl = document.getElementById(yrId);
  const errEl = errId ? document.getElementById(errId) : null;
  if (!yrEl) return;
  const err = typeof hasErr === "string" ? hasErr : "";

  if (err) {
    yrEl.style.display = "none";
    if (errEl) { errEl.textContent = err; errEl.style.display = ""; }
    const card = yrEl.closest(".crossover-card");
    if (card) card.classList.add("crossover-error");
  } else if (show && years !== null) {
    const y = years < 0.1 ? "< 0.1 yr" : years >= 99 ? "99+ yr" : years.toFixed(1) + " yr";
    yrEl.textContent = y; yrEl.style.display = "";
    if (errEl) errEl.style.display = "none";
    const card = yrEl.closest(".crossover-card");
    if (card) card.classList.remove("crossover-error");
  } else {
    yrEl.style.display = "none";
    if (errEl) errEl.style.display = "none";
    const card = yrEl.closest(".crossover-card");
    if (card) card.classList.remove("crossover-error");
  }
}

function renderTargetCalc() {
  const container = document.getElementById("targetCalcContent");
  if (!container) return;

  const growthOpts = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(v =>
    `<option value="${v}">${v}%</option>`
  ).join("");

  container.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end; margin-bottom:12px;">
      <label class="cross-input-label" style="margin-bottom:0;">Growth
        <select id="targetGrowth" class="cross-input" style="max-width:100px">
          <option value="">—</option>
          ${growthOpts}
        </select>
      </label>
      <label class="cross-input-label" style="margin-bottom:0;">Weekly
        <input type="number" id="targetWeekly" class="cross-input" placeholder="100" min="0" step="10" style="max-width:110px" />
      </label>
      <label class="cross-input-label" style="margin-bottom:0;">Target
        <input type="number" id="targetAmount" class="cross-input" placeholder="e.g. 100000" min="0" step="1000" style="max-width:130px" />
      </label>
    </div>
    <span id="targetCalcResult" class="crossover-yr" style="display:none"></span>
  `;

  ["targetGrowth", "targetWeekly", "targetAmount"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(el.tagName === "SELECT" ? "change" : "input", updateTargetResult);
  });
}

function updateTargetResult() {
  const tR = parseFloat((document.getElementById("targetGrowth") || {}).value) || 0;
  const tWeekly = parseFloat((document.getElementById("targetWeekly") || {}).value) || 0;
  const tTarget = parseFloat((document.getElementById("targetAmount") || {}).value) || 0;
  const resultEl = document.getElementById("targetCalcResult");
  if (!resultEl) return;

  const tM = tWeekly * 52 / 12;
  const ti = tR > 0 ? Math.pow(1 + tR / 100, 1 / 12) - 1 : 0;
  const canCalc = tR > 0 && tWeekly > 0 && tTarget > 0;

  let years = null;
  if (canCalc && ti > 0) {
    const ratio = 1 + tTarget * ti / tM;
    if (ratio > 1) years = Math.log(ratio) / Math.log(1 + ti) / 12;
  }

  if (years !== null) {
    const yrText = years < 0.1 ? "< 0.1 yr" : years >= 99 ? "99+ yr" : years.toFixed(1) + " yr";
    resultEl.textContent = yrText;
    resultEl.style.display = "";
  } else {
    resultEl.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", init)
