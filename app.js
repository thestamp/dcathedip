// DCA the Dip configuration
const WEALTHSIMPLE_REFERRAL_URL = "https://www.wealthsimple.com/invite/YOUR_REFERRAL_CODE";

const etfs = {
  canada: [
    { ticker: "XEQT.TO", name: "iShares Core Equity ETF Portfolio", use: "Simple all-equity global index core for Canadian investors." },
    { ticker: "VEQT.TO", name: "Vanguard All-Equity ETF Portfolio", use: "Another broad all-equity global allocation with Vanguard’s methodology." },
    { ticker: "CAGE.TO", name: "Avantis CIBC All-Equity Asset Allocation ETF", use: "Factor-tilted global equity exposure using value and profitability screens." },
    { ticker: "XUU.TO", name: "iShares Core S&P U.S. Total Market ETF", use: "Broad U.S. total-market sleeve for investors who want extra U.S. exposure." },
    { ticker: "XIC.TO", name: "iShares Core S&P/TSX Capped Composite ETF", use: "Canadian equity sleeve for home-market exposure." },
    { ticker: "XEF.TO", name: "iShares Core MSCI EAFE IMI Index ETF", use: "Developed international equity sleeve outside North America." }
  ],
  us: [
    { ticker: "VT", name: "Vanguard Total World Stock ETF", use: "One-ticket global equity market exposure." },
    { ticker: "VTI", name: "Vanguard Total Stock Market ETF", use: "Broad U.S. total-market exposure." },
    { ticker: "VOO", name: "Vanguard S&P 500 ETF", use: "Large-cap U.S. index exposure." },
    { ticker: "VXUS", name: "Vanguard Total International Stock ETF", use: "International equity sleeve outside the U.S." },
    { ticker: "AVGE", name: "Avantis All Equity Markets ETF", use: "Avantis-style global all-equity allocation with factor tilts." },
    { ticker: "QQQM", name: "Invesco NASDAQ 100 ETF", use: "Growth-heavy Nasdaq 100 exposure for higher risk tolerance." }
  ]
};

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat(undefined, { style: "percent", maximumFractionDigits: 1 });
let chart;

function money(value) {
  return fmt.format(value);
}

function setOutputs() {
  const fields = [
    ["capital", v => money(+v)],
    ["daily", v => money(+v)],
    ["dip", v => `${v}%`],
    ["fallDays", v => `${v} days`],
    ["recoverDays", v => `${v} days`],
    ["growth", v => `${v}%`]
  ];
  fields.forEach(([id, render]) => {
    document.getElementById(`${id}Out`).value = render(document.getElementById(id).value);
  });
}

function multiplier(drawdown, mode) {
  if (mode === "steady") return 1;
  if (mode === "aggressive") {
    if (drawdown >= 0.4) return 5;
    if (drawdown >= 0.3) return 4;
    if (drawdown >= 0.2) return 3;
    if (drawdown >= 0.1) return 2;
    return 1;
  }
  if (drawdown >= 0.4) return 3;
  if (drawdown >= 0.3) return 2.5;
  if (drawdown >= 0.2) return 2;
  if (drawdown >= 0.1) return 1.5;
  return 1;
}

function simulate() {
  const capital = +document.getElementById("capital").value;
  const baseDaily = +document.getElementById("daily").value;
  const dipDepth = +document.getElementById("dip").value / 100;
  const fallDays = +document.getElementById("fallDays").value;
  const recoverDays = +document.getElementById("recoverDays").value;
  const growth = +document.getElementById("growth").value / 100;
  const mode = document.getElementById("accelerator").value;
  const afterDays = 365;
  const totalDays = fallDays + recoverDays + afterDays;
  const startPrice = 100;
  const prices = [];

  for (let day = 0; day <= totalDays; day += 1) {
    let price;
    if (day <= fallDays) {
      price = startPrice * (1 - dipDepth * (day / fallDays));
    } else if (day <= fallDays + recoverDays) {
      const t = (day - fallDays) / recoverDays;
      price = startPrice * (1 - dipDepth + dipDepth * t);
    } else {
      const t = (day - fallDays - recoverDays) / 365;
      price = startPrice * Math.pow(1 + growth, t);
    }
    prices.push(price);
  }

  const lumpShares = capital / prices[0];
  const lumpValues = prices.map(p => lumpShares * p);

  let dcaCash = capital;
  let dcaShares = 0;
  const dcaValues = [];
  const dailyBuys = [];
  const sharesSeries = [];

  prices.forEach(price => {
    const drawdown = Math.max(0, 1 - price / startPrice);
    const buy = Math.min(dcaCash, baseDaily * multiplier(drawdown, mode));
    dcaShares += buy / price;
    dcaCash -= buy;
    dcaValues.push(dcaShares * price + dcaCash);
    dailyBuys.push(buy);
    sharesSeries.push(dcaShares);
  });

  return { prices, lumpValues, dcaValues, dailyBuys, sharesSeries, lumpShares, dcaShares, dcaCash, totalDays };
}

function updateChart() {
  setOutputs();
  const result = simulate();
  const labels = result.prices.map((_, i) => i);
  const data = {
    labels,
    datasets: [
      { label: "DCA strategy value", data: result.dcaValues, borderColor: "#53e6a0", backgroundColor: "rgba(83,230,160,0.12)", fill: true, tension: 0.25, pointRadius: 0, borderWidth: 3 },
      { label: "Lump sum value", data: result.lumpValues, borderColor: "#6aa8ff", backgroundColor: "rgba(106,168,255,0.10)", fill: true, tension: 0.25, pointRadius: 0, borderWidth: 3 },
      { label: "Index price", data: result.prices.map(p => p * (result.lumpValues[0] / 100)), borderColor: "rgba(255,209,102,0.85)", borderDash: [6, 6], tension: 0.25, pointRadius: 0, borderWidth: 2 }
    ]
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

  const dcaEnd = result.dcaValues.at(-1);
  const lumpEnd = result.lumpValues.at(-1);
  const advantage = dcaEnd - lumpEnd;
  const totalInvested = +document.getElementById("capital").value - result.dcaCash;
  document.getElementById("stats").innerHTML = `
    <div class="stat good"><small>DCA ending value</small><strong>${money(dcaEnd)}</strong></div>
    <div class="stat"><small>Lump sum ending value</small><strong>${money(lumpEnd)}</strong></div>
    <div class="stat ${advantage >= 0 ? "good" : "warn"}"><small>DCA advantage</small><strong>${money(advantage)}</strong></div>
    <div class="stat"><small>DCA shares accumulated</small><strong>${result.dcaShares.toFixed(1)}</strong></div>
    <div class="stat"><small>Total deployed</small><strong>${money(totalInvested)}</strong></div>
    <div class="stat"><small>Cash remaining</small><strong>${money(result.dcaCash)}</strong></div>
    <div class="stat"><small>Lowest model price</small><strong>${money(Math.min(...result.prices))}</strong></div>
    <div class="stat"><small>Lump sum shares</small><strong>${result.lumpShares.toFixed(1)}</strong></div>
  `;
}

function renderTickers(region) {
  const grid = document.getElementById("tickerGrid");
  grid.innerHTML = etfs[region].map(item => `
    <article class="ticker-card">
      <span class="ticker">${item.ticker}</span>
      <h3>${item.name}</h3>
      <p>${item.use}</p>
    </article>
  `).join("");

  document.querySelectorAll("[data-region]").forEach(btn => btn.classList.toggle("active", btn.dataset.region === region));
  document.getElementById("wealthsimpleBox").style.display = region === "canada" ? "flex" : "none";
  document.getElementById("locationNote").textContent = region === "canada" ? "Showing Canadian-listed ETF ideas." : "Showing U.S.-listed ETF ideas.";
}

function detectLocation() {
  const note = document.getElementById("locationNote");
  if (!navigator.geolocation) {
    note.textContent = "Geolocation is not available in this browser. Pick a market manually.";
    return;
  }
  note.textContent = "Requesting location permission…";
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    // Coarse Canada bounding box. This avoids sending coordinates to a third-party geocoder.
    const isCanada = latitude >= 41 && latitude <= 84 && longitude >= -141 && longitude <= -52;
    renderTickers(isCanada ? "canada" : "us");
    note.textContent = isCanada ? "Location suggests Canada. Showing Canadian-listed ETF ideas." : "Location suggests outside Canada. Showing U.S.-listed ETF ideas.";
  }, () => {
    note.textContent = "Location declined. Pick Canada or U.S. manually.";
  }, { timeout: 8000, maximumAge: 60 * 60 * 1000 });
}

function init() {
  document.querySelectorAll("#dcaForm input, #dcaForm select").forEach(el => el.addEventListener("input", updateChart));
  document.querySelectorAll("[data-region]").forEach(btn => btn.addEventListener("click", () => renderTickers(btn.dataset.region)));
  document.getElementById("detectLocation").addEventListener("click", detectLocation);
  document.getElementById("declineLocation").addEventListener("click", () => {
    document.getElementById("locationNote").textContent = "Location declined. Showing Canadian-listed ETF ideas by default.";
    renderTickers("canada");
  });
  document.getElementById("wealthsimpleLink").href = WEALTHSIMPLE_REFERRAL_URL;
  renderTickers("canada");
  updateChart();
}

document.addEventListener("DOMContentLoaded", init);
