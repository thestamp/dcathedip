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
- Use a coffee example: $5/day equals $35/week, about $152/month, or $1,825/year.
- Compare to a $5 weekly lottery ticket, which equals $260/year.
- Explain that DCA is not guaranteed, but it puts money into productive assets rather than a long-shot bet.
- Remind users not to invest bill money, emergency savings, or cash they expect to need soon.

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

- One-time annual investment amount (default $1,200)
- Daily recurring amount (default $10)

Fixed model assumptions displayed on the chart:

- 25% dip depth
- 30 days falling
- 30 days recovering
- 10% annual growth after recovery
- Deployment window: always 365 days (one full year)

The chart should show each schedule's 1-year ending value compared against the one-time annual investment, with a dollar amount and percentage difference per stat card. No "vs lump sum" or deployment-window slider.

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

- XEQT.TO
- VEQT.TO
- CAGE.TO
- XUU.TO
- XIC.TO
- XEF.TO

### U.S. ETF examples

- VT
- VTI
- VOO
- VXUS
- AVGE
- QQQM

## 8. Canadian account guidance

If the user is in Canada or selects Canada, the site should explain that a TFSA is often the best account for this strategy when contribution room is available because profits and investment growth can be withdrawn tax-free.

The TFSA copy must include caveats:

- TFSA contribution room is personal.
- Withdrawals generally restore room in the next calendar year.
- Overcontributions can be penalized.
- Users should verify official contribution room with CRA My Account.

## 9. TFSA contribution room calculator

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

## 10. Wealthsimple referral

For Canadian users, the site should include a Wealthsimple referral callout.

- Referral URL should be managed in JavaScript as `WEALTHSIMPLE_REFERRAL_URL`.
- Current referral URL: `https://wealthsimple.com/invite/V-MKNQ`.
- Copy should state that new signups using the referral link get $25, if that remains accurate.
- Include a tip that Wealthsimple recurring investments can automate DCA for as little as $1 per day.
- Link the recurring investing tip to: `https://help.wealthsimple.com/hc/en-ca/articles/9544942923547-Set-up-a-recurring-investment`.

## 11. FAQs

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

## 12. Technical requirements

- Site uses Jekyll structure for GitHub Pages.
- Main config: `_config.yml`
- Layouts live under `_layouts/`
- CSS lives under `assets/css/`
- JavaScript lives under `assets/js/`
- Custom domain is configured with `CNAME`.
- Generated files and dependencies must not be committed (`_site/`, `node_modules/`, `vendor/bundle/`, caches).

## 13. Verification requirements

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

## 14. Current limitations

- Local environment may not have Ruby/Jekyll installed. If unavailable, use the lightweight renderer for smoke tests and state that real `bundle exec jekyll build` was not run locally.
- The site is educational and must not claim guaranteed investment results.
