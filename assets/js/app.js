// DCA the Dip configuration
const WEALTHSIMPLE_REFERRAL_URL = "https://wealthsimple.com/invite/V-MKNQ";

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

const frequencies = [
  { key: "daily", label: "Daily DCA", every: 1, multiplier: 1, color: "#53e6a0" },
  { key: "weekly", label: "Weekly DCA", every: 7, multiplier: 5, color: "#6aa8ff" },
  { key: "biweekly", label: "Biweekly DCA", every: 14, multiplier: 10, color: "#ffd166" },
  { key: "monthly", label: "Monthly DCA", every: 30, multiplier: 20, color: "#b892ff" },
  { key: "quarterly", label: "Quarterly DCA", every: 91, multiplier: 60, color: "#ff8fab" }
];

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
let chart;

function money(value) {
  return fmt.format(value);
}

function setOutputs() {
  const fields = [
    ["capital", v => money(+v)],
    ["recurring", v => money(+v)]
  ];
  fields.forEach(([id, render]) => {
    document.getElementById(`${id}Out`).value = render(document.getElementById(id).value);
  });
}

function buildPrices() {
  const dipDepth = 0.25;
  const fallDays = 30;
  const recoverDays = 30;
  const growth = 0.10;
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
  return prices;
}

function contributionDays(every, deployDays, totalDays) {
  const days = [];
  for (let day = 0; day <= Math.min(deployDays, totalDays); day += every) days.push(day);
  if (!days.includes(Math.min(deployDays, totalDays))) days.push(Math.min(deployDays, totalDays));
  return [...new Set(days)].sort((a, b) => a - b);
}

function simulateSchedule(prices, frequency) {
  const deployDays = 365;
  const recurringAmount = +document.getElementById("recurring").value;
  const installment = recurringAmount * frequency.multiplier;
  const days = contributionDays(frequency.every, deployDays, prices.length - 1);
  let shares = 0;
  const values = [];

  prices.forEach((price, day) => {
    if (days.includes(day)) {
      shares += installment / price;
    }
    values.push(shares * price);
  });

  return { ...frequency, values, shares, installment, contributions: days.length, end: values.at(-1) };
}

function simulate() {
  const capital = +document.getElementById("capital").value;
  const prices = buildPrices();
  const lumpShares = capital / prices[0];
  const lumpValues = prices.map(p => lumpShares * p);
  const schedules = frequencies.map(freq => simulateSchedule(prices, freq));
  return { prices, lumpShares, lumpValues, lumpEnd: lumpValues.at(-1), schedules };
}

function updateChart() {
  setOutputs();
  const result = simulate();
  const labels = result.prices.map((_, i) => i);
  const best = [...result.schedules].sort((a, b) => b.end - a.end)[0];
  const daily = result.schedules.find(s => s.key === "daily");

  const data = {
    labels,
    datasets: [
      ...result.schedules.map(schedule => ({
        label: schedule.label,
        data: schedule.values,
        borderColor: schedule.color,
        backgroundColor: `${schedule.color}22`,
        fill: schedule.key === "daily",
        tension: 0.25,
        pointRadius: 0,
        borderWidth: schedule.key === "daily" ? 3 : 2
      })),
      { label: "Lump sum", data: result.lumpValues, borderColor: "rgba(255,255,255,0.72)", borderDash: [7, 7], tension: 0.25, pointRadius: 0, borderWidth: 2 }
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

  document.getElementById("stats").innerHTML = `
    <div class="stat"><small>One-time annual investment</small><strong>${money(result.lumpEnd)}</strong></div>
    ${result.schedules.map(s => {
      const diff = s.end - result.lumpEnd;
      const pct = (diff / result.lumpEnd * 100);
      return `<div class="stat ${diff >= 0 ? "good" : "warn"}"><small>${s.label} (1 year)</small><strong>${money(s.end)} <span>${diff >= 0 ? "+" : ""}${pct.toFixed(1)}%</span></strong></div>`;
    }).join("")}
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
    const isCanada = latitude >= 41 && latitude <= 84 && longitude >= -141 && longitude <= -52;
    renderTickers(isCanada ? "canada" : "us");
    note.textContent = isCanada ? "Location suggests Canada. Showing Canadian-listed ETF ideas." : "Location suggests outside Canada. Showing U.S.-listed ETF ideas.";
  }, () => {
    note.textContent = "Location declined. Pick Canada or U.S. manually.";
  }, { timeout: 8000, maximumAge: 60 * 60 * 1000 });
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
  document.querySelectorAll("#tfsaForm input").forEach(el => el.addEventListener("input", calculateTfsaRoom));
  document.querySelectorAll("[data-region]").forEach(btn => btn.addEventListener("click", () => renderTickers(btn.dataset.region)));
  document.getElementById("detectLocation").addEventListener("click", detectLocation);
  document.getElementById("declineLocation").addEventListener("click", () => {
    document.getElementById("locationNote").textContent = "Location declined. Showing Canadian-listed ETF ideas by default.";
    renderTickers("canada");
  });
  document.getElementById("wealthsimpleLink").href = WEALTHSIMPLE_REFERRAL_URL;
  renderTickers("canada");
  updateChart();
  calculateTfsaRoom();
}

document.addEventListener("DOMContentLoaded", init);
