// Keep Calm and DCA On configuration
const WEALTHSIMPLE_REFERRAL_URL = "https://wealthsimple.com/invite/V-MKNQ";

const etfs = {
  canada: [
    {
      market: "U.S.",
      cap: { ticker: "ZSP.TO", name: "BMO S&P 500 Index ETF", use: "Standard broad-market S&P 500 exposure to large U.S. companies." },
      growth: { ticker: "CAUS.TO", name: "Avantis CIBC U.S. All-Cap Equity ETF", use: "Broader U.S. equity exposure with a factor-oriented approach." },
      leveraged: { ticker: "USSL.TO", name: "Global X Enhanced S&P 500 ETF", use: "1.25× daily leveraged S&P 500 exposure — moderate boost without margin debt." }
    },
    {
      market: "Canada",
      cap: { ticker: "ZIU.TO", name: "BMO S&P/TSX 60 Index ETF", use: "Standard broad-market exposure to 60 large Canadian companies." },
      growth: { ticker: "CACE.TO", name: "Avantis CIBC Canadian Equity ETF", use: "Broad Canadian equity exposure with a factor-oriented approach." },
      leveraged: { ticker: "CANL.TO", name: "Global X Enhanced S&P/TSX 60 ETF", use: "1.25× daily leveraged Canadian large-cap exposure — moderate boost without margin debt." }
    },
    {
      market: "World",
      cap: { ticker: "XEQT.TO", name: "iShares Core Equity ETF Portfolio", use: "Standard global all-equity portfolio across Canada, U.S., international, and emerging markets." },
      growth: { ticker: "CAGE.TO", name: "Avantis CIBC All-Equity Asset Allocation ETF", use: "Global all-equity portfolio with factor tilts." },
      leveraged: { ticker: "HEQL.TO", name: "Global X Enhanced All-Equity ETF", use: "1.25× daily leveraged global all-equity portfolio — moderate boost without margin debt." }
    }
  ],
  us: [
    { ticker: "VT", name: "Vanguard Total World Stock ETF", use: "One-ticket global equity market exposure." },
    { ticker: "VTI", name: "Vanguard Total Stock Market ETF", use: "Broad U.S. total-market exposure." },
    { ticker: "VOO", name: "Vanguard S&P 500 ETF", use: "Large-cap U.S. index exposure." },
    { ticker: "VXUS", name: "Vanguard Total International Stock ETF", use: "International equity sleeve outside the U.S." },
    { ticker: "AVGE", name: "Avantis All Equity Markets ETF", use: "Avantis-style global all-equity allocation with factor tilts." },
    { ticker: "QQQM", name: "Invesco NASDAQ 100 ETF", use: "Concentrated Nasdaq-100 exposure with higher sector and valuation risk." }
  ]
};


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
      <div class="etf-matrix-header">Standard broad-market</div>
      <div class="etf-matrix-header">Tilted / more aggressive</div>
      <div class="etf-matrix-header">1.25× leveraged</div>
      ${etfs.canada.map(row => `
        <div class="market-label">${row.market}</div>
        ${renderEtfCell(row.cap, "cap")}
        ${renderEtfCell(row.growth, "growth")}
        ${renderEtfCell(row.leveraged, "leveraged")}
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
  const withdrawalRate = clampNumber(document.getElementById("crossWithdrawal").value, 1, 10) / 100;
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

  results.innerHTML = `
    <div class="crossover-result-card income"><small>4% rule income target</small><strong>${money(target)}</strong><p>Desired annual income divided by ${(withdrawalRate * 100).toFixed(1)}%.</p></div>
    <div class="crossover-result-card"><small>Amount still needed</small><strong>${money(amountStillNeeded)}</strong><p>How far your current invested amount is from the income target.</p></div>
    <div class="crossover-result-card"><small>Estimated target timing</small><strong>${monthLabel(targetMonth)}</strong><p>Based on your monthly investing and growth assumption.</p></div>
    <div class="crossover-result-card"><small>Contribution crossover</small><strong>${crossoverBalance === null ? "N/A" : money(crossoverBalance)}</strong><p>When average monthly growth implied by your assumption roughly matches your monthly investment.</p></div>
    <div class="crossover-result-card"><small>Crossover timing</small><strong>${monthLabel(crossoverMonth)}</strong><p>When monthly growth is estimated to exceed ${money(monthly)}.</p></div>
    <div class="crossover-result-card"><small>Projected value</small><strong>${money(projectedTarget)}</strong><p>With the monthly investment and growth assumption shown.</p></div>
  `;

  const data = {
    labels,
    datasets: [
      { label: "Portfolio balance", data: balances, borderColor: "#53e6a0", backgroundColor: "rgba(83,230,160,0.12)", fill: true, tension: 0.25, pointRadius: 0, borderWidth: 3 },
      { label: "Total you contributed", data: contributionLine, borderColor: "#6aa8ff", borderDash: [6, 6], tension: 0.2, pointRadius: 0, borderWidth: 2 },
      { label: "4% rule income target", data: targetLine, borderColor: "#7cffbd", borderDash: [9, 4], tension: 0, pointRadius: 0, borderWidth: 2 },
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

function initAdsense() {
  const ads = [...document.querySelectorAll("ins.adsbygoogle")];
  if (!ads.length) return;
  const client = ads[0].dataset.adClient || "";
  const configured = /^ca-pub-\d{10,}$/.test(client);
  document.documentElement.classList.toggle("adsense-configured", configured);
  if (!configured) return;

  const pushAds = () => {
    ads.forEach(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        // Ad blockers or unapproved domains can block AdSense; keep the page usable.
      }
    });
  };

  const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
  if (existingScript) {
    if (window.adsbygoogle) pushAds();
    else existingScript.addEventListener("load", pushAds, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  script.addEventListener("load", pushAds, { once: true });
  document.head.appendChild(script);
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
  document.querySelectorAll("[data-region]").forEach(btn => btn.addEventListener("click", () => renderTickers(btn.dataset.region)));
  const detectLocationButton = document.getElementById("detectLocation");
  if (detectLocationButton) detectLocationButton.addEventListener("click", detectLocation);
  const declineLocationButton = document.getElementById("declineLocation");
  if (declineLocationButton) declineLocationButton.addEventListener("click", () => {
    document.getElementById("locationNote").textContent = "Location declined. Showing Canadian-listed ETF ideas by default.";
    renderTickers("canada");
  });
  document.getElementById("wealthsimpleLink").href = WEALTHSIMPLE_REFERRAL_URL;
  renderTickers("canada");
  updateChart();
  calculateTfsaRoom();
  calculateCompounding();
  calculateCrossover();
  initAdsense();
}

document.addEventListener("DOMContentLoaded", init);
