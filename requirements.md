# DCA the Dip Website Requirements

This document is the source of truth for future website updates. Update this file first, then implement the site from these requirements.

## 1. Site purpose

DCA the Dip explains the benefits of consistent dollar-cost averaging for long-term investors. The site should emphasize simple, repeatable investing habits instead of market timing.

## 2. Core positioning

- Primary message: invest consistently through every market.
- Recommended cadence: daily DCA, because it gives contributions the most chances to buy more units during short-lived dip opportunities; when prices fall, the same dollar amount buys more units.
- Top simple rule should communicate two ideas in plain-language, investment-appropriate terms: daily DCA can buy more units at lower prices during dips, and if broad indexes grow over the long run, those extra units can help future compounding without requiring market timing.
- Strategy must use consistent contribution amounts only.
- Do not recommend increasing contributions during drawdowns.
- Do not discuss or recommend margin.
- Do not present content as financial advice.

## 3. Sustainable DCA amount

The site should include a section explaining how much to DCA.

- Recommended amount: whatever the user can budget sustainably without needing to withdraw because they overextended themselves.
- Emphasize that the habit only works if it survives real life.
- Use a coffee example with trading-day/4-week math: $5/day equals $25/week, $100/month, or $1,200/year.
- Compare to a $5 weekly lottery ticket, which equals $260/year.
- Explain that DCA is not guaranteed, but it puts money into productive assets rather than a long-shot bet.
- Remind users not to invest bill money, emergency savings, or cash they expect to need soon.
- The two budget cards should be laid out as a balanced two-column row on desktop; do not leave a two-card row in a three-column grid.
- The "Invest within your means" section should be a full-width band/separator with a wrapped inner content grid, not a wrapped section whose separator line stops short of the page edges.

## 4. DCA schedule comparison

The site must compare these contribution schedules:

| Frequency | Required angle |
|---|---|
| Daily | Recommended default; smoothest entries; most chances to catch dip days; more transactions |
| Weekly | Simple automation; frequent enough for many investors; can miss fast dips |
| Biweekly / paycheque | Easy budgeting for salaried investors; fewer entries than daily |
| Monthly | Low effort; common budgeting cadence; chunkier timing risk |
| Quarterly | Simplest administration; least responsive to dip opportunities |

The comparison should explain that each schedule can invest the same total amount; only timing changes.

## 5. Interactive DCA chart

The site must include an interactive chart that compares a one-time annual investment against five recurring DCA schedules over one full year.

Compared schedules:

- One-time annual investment (lump sum comparator)
- Daily DCA
- Weekly DCA (5× daily amount per contribution)
- Biweekly DCA (10× daily)
- Monthly DCA (20× daily)
- Quarterly DCA (60× daily)

User-adjustable assumptions:

- Daily recurring amount (default $10)
- Market move editor for adding any number of custom dips or rallies. Each move must include:
  - Start day (0 to 365)
  - Height (default example -25%, range -30% to +30%): negative values model drawdowns/dips; positive values model rallies
  - Width in days each direction (1 to 365): days from start to the bottom/top, and the same width again for recovery when recovery is enabled
  - Recovery checkbox: if checked, the move returns to the annualized path after the second width period; if unchecked, the move remains unrecovered through year-end
- The editor must ship with four predefined unrecovered dips so the chart demonstrates timing risk on page load. The four initial moves are:
  - Start day 50, reaches -10% by day 70, does not recover
  - Start day 125, reaches -10% by day 145, does not recover
  - Start day 150, reaches -10% by day 170, does not recover
  - Start day 250, reaches -10% by day 270, does not recover
- Annualized gain/loss slider (default +10%, range -10% to +10%) that compounds across the entire year, not just non-dip days
- Daily variation slider (default 0%, range 0% to 3%) that adds a deterministic random-looking sequence of daily up/down movements around the annualized path, while keeping slider changes stable and reproducible

Derived value:

- One-time annual investment is not an independent slider. It must be calculated as daily recurring amount × 5 trading days × 52 weeks. This makes the lump-sum comparator equal to the total annual amount a weekly investor would contribute.

Fixed model assumptions displayed on the chart:

- Deployment window: always 365 days (one full year)
- Market moves can represent either drawdowns (negative values) or rallies (positive values), and they are added through the editor rather than three fixed sliders
- Do not show an "Annual DCA" series or stat card because it is the same as the one-time annual investment
- The six chart stat boxes must lay out as a clean 3-by-2 grid on desktop (three across, two rows).

The first contribution for every modeled strategy must happen on day 0 so the visual starts when the plan starts.

All modeled DCA schedules must invest the same total annual dollars as the one-time annual investment. If all market moves are removed or set to 0%, daily variation is 0%, and annual gain/loss is 0%, every DCA schedule and the one-time annual investment should end at the same value. The chart should show each schedule's 1-year ending value compared against the one-time annual investment, with a dollar amount and percentage difference per stat card. No deployment-window slider.

The chart must include an expandable day-by-day comparison table. The table should be collapsed by default, show roughly the first 10 rows in a scrollable container when expanded, and update whenever the assumptions change. It should compare daily values for lump sum, daily, weekly, monthly, and quarterly investing. With all market moves removed or set to 0%, daily variation at 0%, and annual gain/loss at 0%, the final-day values in the table must match across every displayed approach.

## 6. Timing risk section

The site must include a "Why not just buy the dip?" section with:

- Day-trading loss statistics from Barber, Lee, Liu & Odean.
- A psychology benefit summary: easier to start, easier psychologically, builds a habit.
- A DCA-vs-lump-sum comparison table (budget, emotion, expected return, best for).
- RBC GAM research note (1990–2025) explaining that lump sum historically outperforms but emotions often drive the better behavioral choice.

## 7. ETF suggestions by region

The site must suggest ETFs based on user-selected or detected region.

### Location behavior

- Ask for browser geolocation only after user clicks a button.
- Keep location logic client-side.
- Allow users to decline GPS.
- Always allow manual Canada or United States/elsewhere selection.

### Canada ETF examples

For the Canadian region, show ETFs as a grid with rows for market exposure and columns for cap-based versus growth-based choices. Each ETF cell must show the ticker, name, and a quick description of what the fund covers and why it fits that column.

| Market exposure | Cap-based | Growth-based |
|---|---|---|
| U.S. | ZSP.TO — BMO S&P 500 Index ETF, cap-based U.S. large-cap S&P 500 exposure | CAUS.TO — Avantis CIBC U.S. All-Cap Equity ETF, growth-oriented broad U.S. equity exposure |
| Canada | ZIU.TO — BMO S&P/TSX 60 Index ETF, cap-based large Canadian company exposure | CACE.TO — Avantis CIBC Canadian Equity ETF, growth-oriented broad Canadian equity exposure |
| World | XEQT.TO — iShares Core Equity ETF Portfolio, cap-based global all-equity portfolio | CAGE.TO — Avantis CIBC All-Equity Asset Allocation ETF, factor-tilted global all-equity growth-oriented core |

### U.S. ETF examples

- VT
- VTI
- VOO
- VXUS
- AVGE
- QQQM

## 8. Broad index ETF safety framing

The site should include a standalone section explaining that broad index-based ETFs are usually safer building blocks for DCA than concentrated bets.

- Explain that broad-market/index ETFs spread money across many companies and sectors.
- Warn that industry-specific ETFs are more concentrated and can lag the broad market for long periods.
- Warn that individual stocks carry the highest company-specific risk and can overwhelm a DCA habit.
- Keep the language educational and avoid promising safety or guaranteed returns.

## 9. Canadian account guidance

If the user is in Canada or selects Canada, the site should explain that a TFSA is often the best account for this strategy when contribution room is available because profits and investment growth can be withdrawn tax-free.

The TFSA copy must include caveats:

- TFSA contribution room is personal.
- Withdrawals generally restore room in the next calendar year.
- Overcontributions can be penalized.
- Users should verify official contribution room with CRA My Account.

## 10. TFSA contribution room calculator

The site must include a simple TFSA contribution room calculator.

Inputs:

- Eligibility year: the later of the year the user turned 18 or the year the user became a Canadian resident
- Total TFSA contributions already made
- Withdrawals made last year

Outputs:

- First eligible year
- Total possible contribution room to the current modeled year
- Estimated remaining contribution room

Assumptions and notes:

- TFSA eligibility begins in the later of 2009, the year the user turned 18, or the year the user became a Canadian resident.
- Calculator is an estimate only.
- TFSA annual limits must be represented in JavaScript and kept current over time.

## 11. Wealthsimple referral

For Canadian users, the site should include a Wealthsimple referral callout.

- Referral URL should be managed in JavaScript as `WEALTHSIMPLE_REFERRAL_URL`.
- Current referral URL: `https://wealthsimple.com/invite/V-MKNQ`.
- Copy should state that new signups using the referral link get $25, if that remains accurate.
- Include a tip that Wealthsimple recurring investments can automate DCA for as little as $1 per day.
- In the interactive chart copy, advertise Wealthsimple as the automation option and mention that recurring investing can be as little as $1 per day.
- Include a dedicated Wealthsimple promo box with the Wealthsimple logo, referral CTA, and setup copy for daily or weekly recurring investments right from a linked bank account, and mention that recurring investing can be as little as $1 per day. Keep CTA button labels short enough to lay out cleanly.
- The Canadian investors brokerage callout should keep the referral CTA, but should not include the recurring-investing guide link; recurring-investing setup links belong in the other promo boxes that discuss automation.
- Link the recurring-investing setup copy to: `https://help.wealthsimple.com/hc/en-ca/articles/9544942923547-Set-up-a-recurring-investment`.

## 11a. Wealthsimple step-by-step guide

The site must include a standalone step-by-step section walking Canadian users through setting up Wealthsimple for automated DCA.

- Section title: "Wealthsimple step-by-step" with eyebrow "Get started".
- The nav menu at the top of the page must include a "Step-by-step" link pointing to `#wealthsimple-guide`.
- Four numbered steps, each with a heading, explanation, and external links that open in new tabs:

  1. **Set up your Wealthsimple profile** — includes the referral sign-up button ("Sign up with referral") and a note about the $25 bonus. The help guide button uses a "Guide:" prefix so users know it links to a help article, not the actual signup. Link to `https://help.wealthsimple.com/hc/en-ca/articles/1500003505241-Set-up-a-Wealthsimple-profile`, referral to `https://wealthsimple.com/invite/V-MKNQ`.
  2. **Open a Cash account (optional)** — explain that users can link a bank account directly to the Trading account and skip this step, but a Cash account is simpler, quicker, and keeps bank accounts completely separate for security-conscious users. Also mention competitive interest and free ATM withdrawals anywhere in Canada with the physical card. Link to `https://help.wealthsimple.com/hc/en-ca/articles/360056590534-Choose-an-account-to-open`.
  3. **Open a TFSA trading account** — explain TFSA tax benefits. Link to the same account-choosing article.
  4. **Set up a recurring investment** — include a link to the ETF ticker section (`#tickers`) so users can jump to recommended ETFs. Keep Cash account topped up or link a bank account. Link to `https://help.wealthsimple.com/hc/en-ca/articles/9544942923547-Set-up-a-recurring-investment`.

- All help guide buttons must use a "Guide:" prefix (e.g., "Guide: Set up a Wealthsimple profile ↗").
- All links must use `target="_blank" rel="nofollow noopener"` so they open in a new tab.
- The ETF ticker section must include a link back to the step-by-step guide (`← Back to Wealthsimple step-by-step setup`).

## 12. FAQs

The site should include FAQ content:

### Why not just buy the dip?

- Plain-language framing: if most people were consistently good at calling bottoms, they would be professional traders rather than fitting investing around regular jobs.
- Cite Barber, Lee, Liu, and Odean: more than eight out of ten day traders lose money after costs in a typical six-month period.

### What if I suddenly have a large amount to invest?

- Recommends temporary higher fixed DCA rate for new lump-sum cash.
- Example: spread $10,000 across one month at $500 per trading day, 5 days per week.
- Mention Wealthsimple multiple cash accounts for a dedicated "lump sum" account.
- Include the Wealthsimple referral link.

### Why highlight the TFSA for Canadians?

- TFSA lets eligible Canadian investors withdraw growth tax-free.
- Often the cleanest account for long-term ETF DCA when contribution room is available.

### Which ETF is best?

- Broad, low-cost index ETFs are a common starting point.
- Canadian examples: XEQT, VEQT.
- U.S./global examples: VT, VTI, VOO, QQQM.

## 13. Technical requirements

- Site uses Jekyll structure for GitHub Pages.
- Main config: `_config.yml`
- Layouts live under `_layouts/`
- CSS lives under `assets/css/`
- JavaScript lives under `assets/js/`
- Custom domain is configured with `CNAME`.
- Generated files and dependencies must not be committed (`_site/`, `node_modules/`, `vendor/bundle/`, caches).

## 14. Verification requirements

Before finalizing changes, run:

```bash
npm run test
```

The test must:

- Render/build the site into `_site`.
- Syntax-check JavaScript.
- Load the site in Playwright.
- Check for browser console/page errors.
- Verify chart rendering.
- Verify ETF region switching.
- Verify TFSA calculator rendering.

## 15. Current limitations

- Local environment may not have Ruby/Jekyll installed. If unavailable, use the lightweight renderer for smoke tests and state that real `bundle exec jekyll build` was not run locally.
- The site is educational and must not claim guaranteed investment results.
