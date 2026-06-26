// DCA the Dip configuration
const WEALTHSIMPLE_REFERRAL_URL = "https://wealthsimple.com/invite/V-MKNQ";

const etfs = {
  canada: [
    {
      market: "U.S.",
      cap: { ticker: "ZSP.TO", name: "BMO S&P 500 Index ETF", use: "Cap-based S&P 500 exposure to large U.S. companies." },
      growth: { ticker: "ZQQ.TO", name: "BMO Nasdaq 100 Index ETF", use: "Growth-tilted U.S. exposure through Nasdaq-listed innovators." }
    },
    {
      market: "Canada",
      cap: { ticker: "ZIU.TO", name: "BMO S&P/TSX 60 Index ETF", use: "Cap-based exposure to 60 large Canadian companies." },
      growth: { ticker: "XCG.TO", name: "iShares Canadian Growth Index ETF", use: "Canadian companies selected for long-term growth characteristics." }
    },
    {
      market: "World",
      cap: { ticker: "XEQT.TO", name: "iShares Core Equity ETF Portfolio", use: "Cap-based global all-equity portfolio across Canada, U.S., international, and emerging markets." },
      growth: { ticker: "CAGE.TO", name: "Avantis CIBC All-Equity Asset Allocation ETF", use: "Factor-tilted global all-equity portfolio for a more aggressive growth-oriented core." }
    }
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
  { key: "daily", label: "Daily DCA", contributions: 260, color: "#53e6a0" },
  { key: "weekly", label: "Weekly DCA", contributions: 52, color: "#6aa8ff" },
  { key: "biweekly", label: "Biweekly DCA", contributions: 26, color: "#ffd166" },
  { key: "monthly", label: "Monthly DCA", contributions: 13, color: "#b892ff" },
  { key: "quarterly", label: "Quarterly DCA", contributions: 4, color: "#ff8fab" }
];

const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
let chart;
let marketMoves = [
  { id: 1, startDay: 2, height: -25, width: 8, recovers: true }
];
let nextMoveId = 2;

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
    list.innerHTML = `<p class="empty-dips">No custom moves yet. Add a dip or rally to test timing risk.</p>`;
    return;
  }

  list.innerHTML = marketMoves.map(move => {
    const bottomDay = Math.min(365, move.startDay + move.width);
    const recoveryDay = move.recovers ? Math.min(365, bottomDay + move.width) : null;
    const pathText = move.recovers
      ? `starts day ${move.startDay}, reaches ${formatPct(move.height)} by day ${bottomDay}, recovers by day ${recoveryDay}`
      : `starts day ${move.startDay}, reaches ${formatPct(move.height)} by day ${bottomDay}, does not recover`;
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
  const recurringAmount = +document.getElementById("recurring").value;
  const capital = recurringAmount * 5 * 52;
  const prices = buildPrices();
  const lumpShares = capital / prices[0];
  const lumpValues = prices.map(p => lumpShares * p);
  const schedules = frequencies.map(freq => simulateSchedule(prices, freq));
  return { prices, lumpShares, lumpValues, lumpEnd: lumpValues.at(-1), schedules };
}

function renderDailyTable(result) {
  const visibleSchedules = result.schedules.filter(schedule => schedule.key !== "biweekly");
  const headers = ["Day", "Lump sum", ...visibleSchedules.map(schedule => schedule.label.replace(" DCA", ""))];
  const rows = result.prices.map((_, day) => `
    <tr>
      <th scope="row">${day}</th>
      <td>${money(result.lumpValues[day])}</td>
      ${visibleSchedules.map(schedule => `<td>${money(schedule.values[day])}</td>`).join("")}
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

function updateChart() {
  setOutputs();
  renderDipList();
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

  renderDailyTable(result);
}

function renderEtfCell(item, type) {
  return `
    <div class="etf-cell ${type}">
      <span class="ticker">${item.ticker}</span>
      <h3>${item.name}</h3>
      <p>${item.use}</p>
    </div>
  `;
}

function renderTickers(region) {
  const grid = document.getElementById("tickerGrid");
  grid.classList.toggle("etf-matrix", region === "canada");
  grid.classList.toggle("ticker-grid", region !== "canada");

  if (region === "canada") {
    grid.innerHTML = `
      <div class="etf-matrix-header market-label">Market</div>
      <div class="etf-matrix-header">Cap-based</div>
      <div class="etf-matrix-header">Growth-based</div>
      ${etfs.canada.map(row => `
        <div class="market-label">${row.market}</div>
        ${renderEtfCell(row.cap, "cap")}
        ${renderEtfCell(row.growth, "growth")}
      `).join("")}
    `;
  } else {
    grid.innerHTML = etfs.us.map(item => `
      <article class="ticker-card">
        <span class="ticker">${item.ticker}</span>
        <h3>${item.name}</h3>
        <p>${item.use}</p>
      </article>
    `).join("");
  }

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
  document.getElementById("addDip").addEventListener("click", addMarketMove);
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
