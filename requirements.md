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

## 3. DCA schedule comparison

The site must compare these contribution schedules:

| Frequency | Required angle |
|---|---|
| Daily | Recommended default; smoothest entries; most chances to catch dip days; more transactions |
| Weekly | Simple automation; frequent enough for many investors; can miss fast dips |
| Biweekly / paycheque | Easy budgeting for salaried investors; fewer entries than daily |
| Monthly | Low effort; common budgeting cadence; chunkier timing risk |
| Quarterly | Simplest administration; least responsive to dip opportunities |

The comparison should explain that each schedule can invest the same total amount; only timing changes.

## 4. Interactive DCA chart

The site must include an interactive chart that compares:

- Lump sum
- Daily DCA
- Weekly DCA
- Biweekly DCA
- Monthly DCA
- Quarterly DCA

User-adjustable assumptions:

- Initial capital
- DCA deployment window
- Dip depth
- Days falling
- Days recovering
- Annual growth after recovery

The chart should show ending value/stat cards and make daily DCA visually prominent.

## 5. ETF suggestions by region

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

## 6. Canadian account guidance

If the user is in Canada or selects Canada, the site should explain that a TFSA is often the best account for this strategy when contribution room is available because profits and investment growth can be withdrawn tax-free.

The TFSA copy must include caveats:

- TFSA contribution room is personal.
- Withdrawals generally restore room in the next calendar year.
- Overcontributions can be penalized.
- Users should verify official contribution room with CRA My Account.

## 7. TFSA contribution room calculator

The site must include a simple TFSA contribution room calculator.

Inputs:

- Birth year
- Total TFSA contributions already made
- Withdrawals made last year

Outputs:

- First eligible year
- Total possible contribution room to the current modeled year
- Estimated remaining contribution room

Assumptions:

- User was a Canadian resident and eligible from age 18 onward.
- Calculator is an estimate only.
- TFSA annual limits must be represented in JavaScript and kept current over time.

## 8. Wealthsimple referral

For Canadian users, the site should include a Wealthsimple referral callout.

- Referral URL should be managed in JavaScript as `WEALTHSIMPLE_REFERRAL_URL`.
- Current referral URL: `https://wealthsimple.com/invite/V-MKNQ`.
- Copy should state that new signups using the referral link get $25, if that remains accurate.
- Include a tip that Wealthsimple recurring investments can automate DCA for as little as $1 per day.
- Link the recurring investing tip to: `https://help.wealthsimple.com/hc/en-ca/articles/9544942923547-Set-up-a-recurring-investment`.

## 9. Timing risk section and FAQs

The site should include a section and FAQ content explaining why the strategy does not simply tell users to “buy the dip” or invest a lump sum immediately.

### Why not just buy the dip?

- Plain-language framing: if most people were consistently good at calling bottoms, they would be professional traders rather than fitting investing around regular jobs.
- Explain that timing dips is difficult, and cite Barber, Lee, Liu, and Odean, “Do Individual Day Traders Make Money?”, which found that in a typical six-month period, more than eight out of ten day traders lose money after costs.
- Contrast day traders with long-term investors: the day trader often needs profit quickly; the long-term index investor’s advantage is time.
- Explain that DCA spreads the risk of one big buy over time instead of pretending to identify the exact bottom.

### Why not just buy lump sum?

- Explain that lump-sum investing can win if markets rise immediately, and cite Vanguard research showing lump sum historically outperformed cost averaging roughly two-thirds of the time.
- Explain the one-time entry risk: a lump sum exposes all money to the market immediately, including the risk of investing right before a drop.
- Explain that DCA can reduce regret and short-term downside risk by spreading deployment over time, while acknowledging it may reduce expected return because some money waits in cash temporarily.
- Include a simple chart comparing lump sum versus DCA timing risk. Required chart points:
  - Lump sum has 100% day-one exposure.
  - A one-month DCA has about 50% average exposure during deployment.
  - Vanguard found lump sum historically outperformed cost averaging roughly two-thirds of the time.

### Lump sum FAQ

The FAQ should address what to do if someone suddenly has a large amount of money to invest.

- Explain that lump-sum investing can win if markets rise immediately, but some investors may prefer to reduce timing risk by deploying the money gradually.
- Recommend a temporary higher fixed DCA rate for new lump-sum cash, not variable buying based on drawdowns.
- Example: spread $10,000 across one month by investing $500 per trading day, 5 days per week.
- Mention that Wealthsimple supports multiple cash accounts, so a user can create a dedicated “lump sum” cash account and gradually invest from it without touching their main cash account.
- Include the Wealthsimple referral link in this FAQ for users who need to set up an account.
- Keep the explanation educational and avoid presenting it as personalized financial advice.

### Withdrawal FAQ

- Add an FAQ: “When is the best time to withdraw?”
- Recommended answer: withdraw when the money has a real-life purpose or life event, such as a vacation, a new car, a home goal, or another genuine need.
- Encourage users to keep DCA’ing if the plan still fits and withdraw only when they actually need the money.
- Do not frame normal market volatility as a reason to stop the investing habit.

## 10. Technical requirements

- Site uses Jekyll structure for GitHub Pages.
- Main config: `_config.yml`
- Layouts live under `_layouts/`
- CSS lives under `assets/css/`
- JavaScript lives under `assets/js/`
- Custom domain is configured with `CNAME`.
- Generated files and dependencies must not be committed (`_site/`, `node_modules/`, `vendor/bundle/`, caches).

## 11. Verification requirements

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

## 12. Current limitations

- Local environment may not have Ruby/Jekyll installed. If unavailable, use the lightweight renderer for smoke tests and state that real `bundle exec jekyll build` was not run locally.
- The site is educational and must not claim guaranteed investment results.
