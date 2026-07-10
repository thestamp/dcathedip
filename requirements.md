# DCA the Dip Website Requirements

This document is the source of truth for future website updates. Update this file first, then implement the site from these requirements.

## 1. Site purpose

DCA the Dip helps Canadian beginners automate recurring ETF investing, compare dollar-cost averaging schedules, understand market dips and compounding, and build a repeatable investing habit without trying to time the market.

## 2. Core positioning and tone

- Primary brand line: **Automate the habit. Ignore the noise.**
- SEO target: **Dollar-Cost Averaging Calculator Canada | DCA the Dip**.
- Lead with benefit and confidence; avoid opening headlines/lead paragraphs with caveats.
- Use a plain-language coach voice: start small, automate it, keep going.
- Explain that lower prices buy more units when the contribution amount stays fixed.
- Do not recommend increasing contributions during drawdowns.
- Do not discuss or recommend margin.
- Consolidate heavy disclosures in the footer, FAQ, and compact calculator notes rather than repeating them in headlines.

## 3. SEO metadata

Page front matter should use:

- Title: `Dollar-Cost Averaging Calculator Canada | DCA the Dip`
- Description: `Compare daily, weekly, biweekly, monthly, and quarterly dollar-cost averaging strategies. Learn how automated ETF investing, compounding, TFSA accounts, and market dips work for Canadian investors.`

The homepage should naturally include these search themes:

- dollar-cost averaging Canada
- DCA calculator Canada
- daily DCA calculator
- ETF investing for beginners Canada
- recurring ETF investing
- TFSA dollar-cost averaging
- DCA vs lump sum
- Rule of 72
- compound interest calculator

## 4. Page structure

Recommended order:

1. Hero: strong promise and primary CTA
2. Simple DCA explanation
3. DCA calculator comparing schedules
4. How DCA/automation works
5. Frequency guide
6. Compounding and Rule of 72
7. Simple investing foundation
8. Risk and comfort / ETF mix
9. Budget and sustainable investing
10. Broad ETF building blocks
11. Wealthsimple setup
12. ETF examples
13. TFSA
14. Timing risk / DCA vs lump sum
15. Withdrawal guidance
16. FAQ
17. Footer disclosure

## 5. Hero requirements

Hero must include:

- Eyebrow: `Dollar-cost averaging for Canadian ETF investors`
- H1: `Automate the habit. Ignore the noise.`
- Lede: DCA the Dip helps beginners invest a fixed amount on a regular schedule, compare daily versus weekly or monthly contributions, and understand how compounding works over time.
- Supporting sentence: Build a simple recurring ETF investing routine through rising, falling, and sideways markets — no market timing required.
- Primary CTA: `Try the DCA calculator`
- Secondary CTA: `See how it works`
- Trust row: built for beginners, ETF-focused, TFSA-friendly, no market timing required.

The hero must not open with “not advice,” “not a forecast,” “not recommendations,” or similar caveat-first phrasing.

## 6. Simple rule card

The top rule card should say:

- Heading: `Lower prices buy more units.`
- Body: When the user invests the same planned amount on a regular schedule, market dips naturally buy more ETF units. When prices are higher, the same contribution buys fewer units.
- Microcopy: `Same dollars. More units on lower-price days. No guessing the bottom.`

## 7. DCA calculator

The site must include an interactive chart comparing a one-time annual investment against recurring DCA schedules over one year.

Compared schedules:

- One-time annual investment / lump-sum comparator
- Daily DCA
- Weekly DCA
- Biweekly DCA
- Monthly DCA
- Quarterly DCA

Required behavior:

- One-time annual investment is derived from daily amount × 5 trading days × 52 weeks.
- Each schedule invests the same total annual dollars; only timing changes.
- The first contribution for every modeled strategy happens on day 0.
- Monthly DCA uses 12 contributions/year.
- If all market moves are removed, annual gain/loss is 0%, and daily variation is 0%, every schedule and the lump-sum comparator must end equal.
- The chart must include expandable day-by-day comparison table, collapsed by default.

Calculator copy:

- Eyebrow: `DCA calculator`
- Heading: `Compare daily, weekly, biweekly, monthly, and quarterly investing.`
- Intro: Use the calculator to see how different contribution schedules work when each schedule invests the same total dollars over one year.
- Small note: `Educational estimate. Actual market returns vary.`

Advanced controls should be collapsible under `Advanced market scenario controls` and use beginner labels:

| Technical idea | Public label |
|---|---|
| Market move editor | Add a market dip or rally |
| Start day | When it starts |
| Height | Market move |
| Width each direction | How long it lasts |
| Recovers after the move | Market recovers afterward |
| Reset neutral | Reset to neutral |

Keep the long model explanation inside an expandable `How this calculator works` area.

## 8. How DCA works / automation benefits

Section must include:

- Eyebrow: `Why automate your DCA strategy?`
- Heading: `Make investing automatic before emotions get involved.`
- Copy explaining that DCA turns investing into a routine.

Cards:

1. Removes timing pressure — regular ETF buys spread entries across market days.
2. Builds the habit — small recurring contributions are easier to keep than occasional big decisions.
3. Fits paycheque investing — payday-based, weekly, monthly, or daily DCA can all work.

## 9. Frequency guide

- Heading: `Same dollars. Different rhythm. Different experience.`
- Explain that daily, weekly, biweekly/payday, monthly, and quarterly can all be reasonable.
- Table should emphasize best fit and simple tradeoff, not imply daily is objectively superior.

## 10. Compounding roadmap

The site must include a standalone compounding section.

Required content:

- Eyebrow: `Compounding over time`
- Heading: `Compounding rewards the investors who keep going.`
- Explain that contributions do most of the work early, then a larger balance gives investment growth more room to matter.
- Use the 8-4-3 framework as storytelling:
  - Years 1–8: Build the base
  - Years 9–12: Momentum appears
  - Years 13–15: Growth becomes visible
- Include a note that 8-4-3 is a memorable way to understand patience, not an exact schedule.

## 11. Rule of 72

- Eyebrow: `Quick mental math`
- Heading: `How long to double your money?`
- Formula: `72 ÷ return = years to double`
- Example: at 8%, money roughly doubles in about 9 years.
- Keep inflation/tax/fee/purchasing-power caveats as a short note, not the main headline.

## 12. DCA compounding calculator

Inputs:

- Initial investment
- Recurring contribution
- Years invested
- Return assumption preset
- Custom CAGR

Presets must be generic assumptions, not ETF-specific return forecasts:

- Very conservative: 3%
- Conservative: 4%
- Moderate: 6%
- Long-term equity: 8%
- Aggressive: 10%
- Custom

Outputs:

- Estimated future value
- Total contributed
- Estimated growth
- Rule-of-72 double time

Bottom note: results are estimates based on the return assumption chosen; encourage testing lower and higher scenarios.

## 13. Growth milestones / 4% rule income target

This section should focus on two simple ideas and avoid Coast FI terminology:

1. **Contribution crossover**: the point where average monthly growth implied by the growth assumption roughly matches the user's monthly investment.
2. **4% rule income target**: the amount invested that may be needed to support a desired annual portfolio income using a withdrawal-rate assumption.

Required content:

- Eyebrow: `Income target`
- Heading: `How much invested could support the income you want?`
- Main formula: desired annual income ÷ withdrawal-rate assumption.
- Default withdrawal-rate assumption: 4%.
- Explain that this is a simplified retirement-planning shortcut, not a guarantee.
- Use an expandable contextual footnote explaining why the site uses the 4% rule instead of a CAGR/self-replenishing-income line.
- Recommended term: `4% rule income target`.
- Avoid “self-replenishing income” and “growth-funded income” as visible primary labels.

Inputs:

- Current invested amount
- Monthly investment
- Growth assumption
- Desired annual income
- Withdrawal-rate assumption
- Years to model

Outputs:

- 4% rule income target
- Amount still needed
- Estimated target timing
- Contribution crossover
- Crossover timing
- Projected value

Chart lines:

- Portfolio balance
- Total you contributed
- 4% rule income target
- Contribution crossover

## 14. Sustainable budget and means sections

Budget section:

- Eyebrow: `How much should I DCA?`
- Heading: `Start with an amount so small it is easy to keep.`
- Coffee example: $5 weekday coffee = $25/week, about $100 over four weeks, roughly $1,200/year.
- Lottery example: $5 weekly lottery ticket = $260/year.
- Keep two cards in a balanced two-column row on desktop.

Sustainable investing section:

- Eyebrow: `Sustainable investing`
- Heading: `Invest money that can stay invested.`
- Explain that bill money, rent money, and emergency savings should stay separate from the investing habit.
- Keep as a full-width band with wrapped inner content.

## 15. Broad ETF building blocks

- Eyebrow: `Diversified building blocks`
- Heading: `Broad ETFs make diversification simple.`
- Explain broad ETFs spread money across many companies, sectors, and sometimes countries.

Cards:

- Broad-market ETFs
- Balanced ETFs
- Individual stocks / sector ETFs

## 16. ETF examples

- Eyebrow: `ETF examples`
- Heading: `Broad ETF examples for Canadian investors`
- Copy: use as a starting point for research; compare fees, holdings, risk rating, account fit, currency exposure, and tax treatment.
- Default to Canada. Manual region buttons are enough: Canada and United States / elsewhere.

Canadian ETF grid:

| Market exposure | Standard broad-market example | Tilted / more aggressive example |
|---|---|---|
| U.S. | ZSP.TO — BMO S&P 500 Index ETF | CAUS.TO — Avantis CIBC U.S. All-Cap Equity ETF |
| Canada | ZIU.TO — BMO S&P/TSX 60 Index ETF | CACE.TO — Avantis CIBC Canadian Equity ETF |
| World | XEQT.TO — iShares Core Equity ETF Portfolio | CAGE.TO — Avantis CIBC All-Equity Asset Allocation ETF |

U.S./elsewhere examples:

- VT
- VTI
- VOO
- VXUS
- AVGE
- QQQM

## 17. Wealthsimple setup and referral

Wealthsimple can be presented as a popular Canadian platform for automating recurring ETF purchases.

Rules:

- Use a small `Referral link` label near referral CTAs.
- Put the full referral disclosure in the footer.
- Do not interrupt mid-page promotional copy with long referral disclaimers.
- Use `ETF examples`, not `recommended ETFs`.
- Keep external guide buttons opening in a new tab with `target="_blank" rel="nofollow noopener"`.
- Current referral URL: `https://wealthsimple.com/invite/V-MKNQ`.
- Recurring investment guide URL: `https://help.wealthsimple.com/hc/en-ca/articles/9544942923547-Set-up-a-recurring-investment`.

Step-by-step section:

1. Create your Wealthsimple profile
2. Choose where cash will come from
3. Open the investing account you want to use
4. Set up a recurring investment

## 18. TFSA section

- Eyebrow: `For Canadian investors`
- Heading: `Why many Canadians start with a TFSA`
- First paragraph should be positive: TFSA can be a flexible place to hold long-term ETF investments because eligible growth and withdrawals are generally tax-free in Canada.
- Later copy may mention FHSA, RRSP, employer match, debt repayment, and other priorities.
- Explain TFSA contribution room is personal and should be confirmed with CRA My Account.
- Calculator note must state TFSA limit data last updated for 2026.

## 19. Timing risk / DCA vs lump sum

Move this below calculator, compounding, ETF, and TFSA content.

- Eyebrow: `Timing risk`
- Heading: `Timing dips is harder than it looks.`
- Explain that the problem is emotion, uncertainty, and consistency.
- DCA removes pressure around deciding if today is perfect.
- For paycheque investors, DCA is a natural fit because money arrives over time.
- Keep Barber/Lee/Liu/Odean and RBC GAM sources in the source note.
- Comparison table should be practical fit, not a caveat-forward expected-return table.

## 20. Withdrawal section

- Eyebrow: `When to withdraw`
- Heading: `Withdraw when the money has a real job — not because the market is noisy.`
- Mention planned goals, emergencies, rebalancing, or risk reduction before known expenses.
- Warn against panic selling in supporting copy.

## 21. FAQ

Use SEO-shaped questions:

- What is dollar-cost averaging?
- Is DCA good for beginners?
- Is daily DCA better than weekly or monthly DCA?
- Can I dollar-cost average in a TFSA?
- What ETFs do Canadians use for DCA?
- What is the Rule of 72?
- Is DCA better than lump sum investing?
- What return should I assume in the calculator?
- Are ETF tickers on this site recommendations?
- What is the 4% rule?

## 22. Footer disclosure

Create a structured footer disclosure called `Important information` with bullet points:

- Educational content only, not financial advice.
- Investing involves risk, including possible loss of principal.
- Calculator results are simplified estimates based on user-selected assumptions.
- Real returns vary and can be negative.
- Taxes, fees, inflation, account rules, currency effects, and personal circumstances can change outcomes.
- ETF tickers are examples for research, not personal recommendations.
- Referral links may provide a benefit to the site owner.
- Confirm TFSA contribution room and account rules with official sources.

## 23. Mobile friendliness requirements

The site must remain comfortable on 360px–390px phones and tablets:

- No body-level horizontal overflow.
- Controls and CTA buttons should be at least 44px tall where practical.
- Complex tables/charts may scroll inside their own containers, but body must not sideways-scroll.
- Late-added grids must collapse to one column on phones.
- Desktop visual hierarchy should remain intact while mobile sections use shorter spacing, readable font sizes, full-width buttons, and compact cards.

## 24. Technical requirements

- Site uses Jekyll structure for GitHub Pages.
- Main config: `_config.yml`.
- Layouts live under `_layouts/`.
- CSS lives under `assets/css/`.
- JavaScript lives under `assets/js/`.
- Custom domain is configured with `CNAME`.
- Generated files and dependencies must not be committed (`_site/`, `node_modules/`, `vendor/bundle/`, caches).

## 25. Verification requirements

Before finalizing changes, run:

```bash
npm run test
```

The test must:

- Render/build the site into `_site`.
- Syntax-check JavaScript.
- Load the site in Playwright.
- Check for browser console/page errors.
- Verify chart rendering and neutral-case invariants.
- Verify ETF region switching.
- Verify TFSA calculator rendering.
- Verify SEO-first hero copy and structured footer disclosure.
- Run mobile audit across common phone/tablet widths.

## 26. Current limitations

- Local environment may not have Ruby/Jekyll installed. If unavailable, use the lightweight renderer for smoke tests and state that real `bundle exec jekyll build` was not run locally.
- The site is educational and must not claim guaranteed investment results.


## Current UX direction: 3-step journey

The site should be organized as a guided path rather than scattered finance topics:

1. **Start** — foundation, risk comfort, cash buffer, account fit.
2. **Automate** — recurring contribution amount, DCA schedule, budget habit, brokerage setup, ETF examples, TFSA context.
3. **Grow** — compounding, Rule of 72, 4% rule income target, timing/lump-sum context, withdrawal behaviour.

Each major section should include an expandable contextual footnote/caveat. The main copy should remain confident and SEO-friendly; heavier nuance belongs in section footnotes, FAQ, and footer disclosures.

The former Coast FI / CAGR-income line is removed. The income target tool uses the 4% rule by default: desired annual income ÷ withdrawal-rate assumption.

The DCA chart should default to a neutral scenario and offer clear preset scenario buttons plus a Custom option that opens the market-move editor.
