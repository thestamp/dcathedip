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

function renderLevGrid() {
  const grid = document.getElementById("levGrid");
  if (!grid) return;

  const leveraged = etfsFlat.filter(e => e.type === 'leveraged');
  const bestLev = leveraged.find(e => e.market === 'World');

  grid.innerHTML = `
    <h3 style="margin:0 0 4px;">1.25× moderate leverage ETFs</h3>
    <p style="margin:0 0 18px; color:var(--muted);">These target 125% of their index's daily return. Unlike 2×/3× products, <strong>no margin account or collateral</strong> is needed — you buy shares like any other ETF and your maximum loss is what you invested. Still, losses are amplified on down days and daily reset effects can cause drift from the simple multiple over time.</p>
    <div class="etf-cards">
      ${leveraged.map(etf => {
        const isBest = etf === bestLev;
        const displayTicker = etf.ticker.replace('.TO', '');
        const score = totalScore(etf);
        return `
          <article class="etf-card high-lev${isBest ? ' etf-best-lev' : ''}">
            <div class="etf-card-head">
              <span class="ticker">${displayTicker}</span>
              <span class="etf-lev-tag">1.25×</span>
              ${isBest ? '<span class="etf-best-star etf-best-lev-star" title="Recommended: 1.25× global all-equity with moderate leverage">★</span>' : ''}
            </div>
            <h3>${etf.name}</h3>
            <div class="etf-card-metrics">
              <span class="etf-metric">MER <strong>${etf.mer}</strong></span>
              <span class="etf-metric">5Y <strong>${etf.return5y}</strong></span>
              <span class="etf-metric">Net <strong>${score}%</strong></span>
            </div>
            <p class="etf-lean">${etf.lean}</p>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

const cagrPresets = [
  { label: "Custom", value: "custom", cagr: 6 },
  { label: "Very conservative", value: "very-conservative", cagr: 3 },
  { label: "Conservative", value: "conservative", cagr: 4 },
  { label: "Moderate", value: "moderate", cagr: 6 },
  { label: "Long-term equity", value: "equity", cagr: 8 },
  { label: "Aggressive", value: "aggressive", cagr: 10 }
];

const frequencies = [
  { key: "daily", label: "Daily DCA", contributions: 260, color: "#53e6a0" },
  { key: "weekly", label: "Weekly DCA", contributions: 52, color: "#6aa8ff" },
  { key: "biweekly", label: "Biweekly DCA", contributions: 26, color: "#ffd166" },
  { key: "monthly", label: "Monthly DCA", contributions: 12, color: "#b892ff" },
  { key: "quarterly", label: "Quarterly DCA", contributions: 4, color: "#ff8fab" }
];

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
let chart;
let crossoverChart;
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


function populateCagrPresets() {
  const select = document.getElementById("compoundPreset");
  if (!select) return;
  select.innerHTML = cagrPresets.map(preset => `<option value="${preset.value}" data-cagr="${preset.cagr}">${preset.label} (${preset.cagr}%)</option>`).join("");
}

function calculateCompounding() {
  const results = document.getElementById("compoundResults");
  if (!results) return;
  const initial = Math.max(0, +document.getElementById("compoundInitial").value || 0);
  const dailyContribution = Math.max(0, +document.getElementById("compoundDaily").value || 0);
  const years = clampNumber(document.getElementById("compoundYears").value, 1, 60);
  const cagr = clampNumber(document.getElementById("compoundCagr").value, -20, 20);
  const periodsPerYear = 260;
  const periods = Math.round(years * periodsPerYear);
  const periodRate = Math.pow(1 + cagr / 100, 1 / periodsPerYear) - 1;
  let futureContributions;
  if (Math.abs(periodRate) < 0.0000001) {
    futureContributions = dailyContribution * periods;
  } else {
    futureContributions = dailyContribution * ((Math.pow(1 + periodRate, periods) - 1) / periodRate);
  }
  const futureInitial = initial * Math.pow(1 + periodRate, periods);
  const futureValue = futureInitial + futureContributions;
  const totalContributed = initial + dailyContribution * periods;
  const estimatedGrowth = futureValue - totalContributed;
  const doublingYears = cagr > 0 ? (72 / cagr).toFixed(1) : "N/A";

  results.innerHTML = `
    <div class="compound-result-card"><small>Estimated future value</small><strong>${money(futureValue)}</strong></div>
    <div class="compound-result-card"><small>Total contributed</small><strong>${money(totalContributed)}</strong></div>
    <div class="compound-result-card growth"><small>Estimated growth</small><strong>${money(estimatedGrowth)}</strong></div>
    <div class="compound-result-card"><small>Rule-of-72 double time</small><strong>${doublingYears}${doublingYears === "N/A" ? "" : " years"}</strong></div>
  `;
}

function applyCagrPreset() {
  const select = document.getElementById("compoundPreset");
  if (!select) return;
  const selected = select.selectedOptions[0];
  document.getElementById("compoundCagr").value = selected.dataset.cagr;
  calculateCompounding();
}


function monthLabel(month) {
  if (month === null) return "Not reached";
  if (month === 0) return "Already there";
  const years = Math.floor(month / 12);
  const months = month % 12;
  if (years === 0) return `${months} mo`;
  return months ? `${years} yr ${months} mo` : `${years} yr`;
}

function calculateCrossover() {
  const results = document.getElementById("crossoverResults");
  const canvas = document.getElementById("crossoverChart");
  if (!results || !canvas) return;

  const current = Math.max(0, +document.getElementById("crossCurrent").value || 0);
  const monthly = Math.max(0, +document.getElementById("crossMonthly").value || 0);
  const cagr = clampNumber(document.getElementById("crossCagr").value, -20, 20);
  const desiredIncome = Math.max(0, +document.getElementById("crossSpending").value || 0);
  const withdrawalRate = 0.04; // always 4%
  const years = clampNumber(document.getElementById("crossYears").value, 1, 60);
  const totalMonths = Math.round(years * 12);
  const monthlyRate = Math.pow(1 + cagr / 100, 1 / 12) - 1;
  const target = withdrawalRate > 0 ? desiredIncome / withdrawalRate : 0;
  const amountStillNeeded = Math.max(0, target - current);
  const canGrow = monthlyRate > 0;
  const crossoverBalance = canGrow && monthly > 0 ? monthly / monthlyRate : null;

  const labels = [];
  const balances = [];
  const contributionLine = [];
  const targetLine = [];
  const crossoverLine = [];
  let balance = current;
  let targetMonth = current >= target ? 0 : null;
  let crossoverMonth = crossoverBalance !== null && current >= crossoverBalance ? 0 : null;

  for (let month = 0; month <= totalMonths; month += 1) {
    labels.push(month);
    balances.push(balance);
    contributionLine.push(current + monthly * month);
    targetLine.push(target);
    crossoverLine.push(crossoverBalance);
    if (targetMonth === null && balance >= target) targetMonth = month;
    if (crossoverMonth === null && crossoverBalance !== null && balance >= crossoverBalance) crossoverMonth = month;
    if (month < totalMonths) balance = balance * (1 + monthlyRate) + monthly;
  }

  const projectedTarget = balances.at(-1);
  const shortfall = projectedTarget < target ? target - projectedTarget : 0;

  results.innerHTML = `
    <div class="crossover-results-row crossover-results-targets">
      <div class="crossover-result-card income"><small>Investment target</small><strong>${money(target)}</strong><p>Desired annual income divided by 4%.</p></div>
      <div class="crossover-result-card${shortfall > 0 ? ' shortfall' : ''}"><small>Projected value</small><strong>${money(projectedTarget)}</strong><p>${shortfall > 0 ? `Shortfall of ${money(shortfall)} — below the investment target.` : `With the monthly investment and growth assumption shown.`}</p></div>
    </div>
    <div class="crossover-results-row crossover-results-crossover">
      <div class="crossover-result-card"><small>Contribution crossover</small><strong>${crossoverBalance === null ? "N/A" : money(crossoverBalance)}</strong><p>When average monthly growth implied by your assumption roughly matches your monthly investment.</p></div>
      <div class="crossover-result-card"><small>Crossover timing</small><strong>${monthLabel(crossoverMonth)}</strong><p>When monthly growth is estimated to exceed ${money(monthly)}.</p></div>
    </div>
  `;

  const data = {
    labels,
    datasets: [
      { label: "Portfolio balance", data: balances, borderColor: "#53e6a0", backgroundColor: "rgba(83,230,160,0.12)", fill: true, tension: 0.25, pointRadius: 0, borderWidth: 3 },
      { label: "Total you contributed", data: contributionLine, borderColor: "#6aa8ff", borderDash: [6, 6], tension: 0.2, pointRadius: 0, borderWidth: 2 },
      { label: "Investment target", data: targetLine, borderColor: "#7cffbd", borderDash: [9, 4], tension: 0, pointRadius: 0, borderWidth: 2 },
      { label: "Contribution crossover", data: crossoverLine, borderColor: "#ffd166", borderDash: [3, 5], tension: 0, pointRadius: 0, borderWidth: 2 }
    ]
  };

  if (crossoverChart) {
    crossoverChart.data = data;
    crossoverChart.update();
  } else {
    crossoverChart = new Chart(canvas, {
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
          x: { title: { display: true, text: "Months", color: "#aebbd0" }, ticks: { color: "#aebbd0", maxTicksLimit: 8 }, grid: { color: "rgba(255,255,255,0.06)" } },
          y: { ticks: { color: "#aebbd0", callback: value => money(value) }, grid: { color: "rgba(255,255,255,0.08)" } }
        }
      }
    });
  }
}

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
  populateCagrPresets();
  document.querySelectorAll("#compoundForm input").forEach(el => el.addEventListener("input", calculateCompounding));
  document.getElementById("compoundPreset").addEventListener("change", applyCagrPreset);
  document.querySelectorAll("#crossoverForm input").forEach(el => el.addEventListener("input", calculateCrossover));
  document.getElementById("wealthsimpleLink").href = WEALTHSIMPLE_REFERRAL_URL;
    renderTickers();
    renderLevGrid();
    updateChart();
  calculateTfsaRoom();
  calculateCompounding();
  calculateCrossover();
}

document.addEventListener("DOMContentLoaded", init);
