# DCA the Dip Website Requirements

This document is the source of truth for future website updates. Update this file first, then implement the site from these requirements.

## 1. Site purpose

DCA the Dip explains the benefits of consistent dollar-cost averaging for long-term investors. The site should emphasize simple, repeatable investing habits instead of market timing.

## 2. Core positioning

- Primary message: invest consistently through every market.
- Recommended cadence: daily DCA, because it gives contributions the most chances to buy more units during short-lived dip opportunities; when prices fall, the same dollar amount buys more units.
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

- Referral URL is stored as a JavaScript variable.
- Current referral URL: `https://wealthsimple.com/invite/V-MKNQ`
- Copy should mention that new signups using the referral link get $25.

## 9. Technical requirements

- Site uses Jekyll structure for GitHub Pages.
- Main config: `_config.yml`
- Layouts live under `_layouts/`
- CSS lives under `assets/css/`
- JavaScript lives under `assets/js/`
- Custom domain is configured with `CNAME`.
- Generated files and dependencies must not be committed (`_site/`, `node_modules/`, `vendor/bundle/`, caches).

## 10. Verification requirements

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

## 11. Current limitations

- Local environment may not have Ruby/Jekyll installed. If unavailable, use the lightweight renderer for smoke tests and state that real `bundle exec jekyll build` was not run locally.
- The site is educational and must not claim guaranteed investment results.
