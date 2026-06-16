# Loan & Mortgage Calculator

A free, 100% client-side loan and mortgage calculator. Enter the amount, annual
interest rate and term to instantly see your **monthly payment**, **total
interest**, **payoff time** and a full **amortization schedule**. An optional
"extra monthly payment" field shows how overpaying shortens the term and cuts
interest.

- **Private:** all maths runs in your browser — nothing is uploaded or stored.
- **Zero dependencies:** plain HTML/CSS/JS, loads instantly.
- **9 currencies** for display.

## The math

Standard amortizing-loan formula. With monthly rate `r = annualRate / 100 / 12`
and `n = years × 12` payments:

```
monthlyPayment = P · r / (1 − (1 + r)^−n)        (and P / n when r = 0)
```

The schedule is then walked month-by-month so extra payments and the final
partial payment are handled exactly.

## Tests

The financial logic in `app.js` is exported and unit-tested:

```bash
cd projects/loan-calculator
node app.test.cjs        # 16/16 assertions
```

Covered: the textbook $250k @ 6.5%/30yr ≈ $1,580.17 payment, totals reconcile
(`totalPaid = principal + totalInterest`), full amortization to a zero balance,
zero-interest loans, per-row `principal + interest = payment`, monotonic
balance, extra-payment savings, rate monotonicity, and degenerate inputs.

## Monetization

`config.js` drives an optional support rail (tip jar, a "Pro" product, and
affiliate links). All fields are blank by default and hidden until filled — see
the repo's `PROJECT_LOG.md` for the one-time owner setup that turns revenue on.
