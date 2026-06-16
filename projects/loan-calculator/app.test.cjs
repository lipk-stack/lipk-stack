/*
 * Unit tests for the loan amortization math. Run with:  node app.test.cjs
 * (Copied/required as .cjs because the repo-root package.json is "type":"module".)
 */
const assert = require("assert");
const { computeLoan, round2 } = require("./app.js");

let passed = 0;
function check(name, cond) {
  assert.ok(cond, name);
  passed++;
}
// Allow a cent of rounding tolerance on money comparisons.
const near = (a, b, eps = 0.01) => Math.abs(a - b) <= eps;

// 1. Classic 30-year mortgage: $250,000 @ 6.5% → well-known ~$1580.17/mo.
let r = computeLoan(250000, 6.5, 30, 0);
check("30y payment ~1580.17", near(r.monthlyPayment, 1580.17, 0.5));
check("30y has 360 payments", r.months === 360);

// 2. Total paid = principal + total interest (conservation of money).
check("totals reconcile", near(r.totalPaid, 250000 + r.totalInterest, 0.05));

// 3. Final balance is fully paid off.
check("loan fully amortized", r.schedule[r.schedule.length - 1].balance === 0);

// 4. Zero-interest loan: payment is exactly principal / months, no interest.
let z = computeLoan(12000, 0, 1, 0);
check("0% payment = P/n", near(z.monthlyPayment, 1000));
check("0% total interest is 0", z.totalInterest === 0);
check("0% total paid = principal", near(z.totalPaid, 12000));

// 5. Per-row identity: principal + interest === payment (within a cent).
check("row split adds up", r.schedule.every((p) => near(p.principal + p.interest, p.payment)));

// 6. Balance is monotonically non-increasing.
let mono = true;
for (let i = 1; i < r.schedule.length; i++) {
  if (r.schedule[i].balance > r.schedule[i - 1].balance + 1e-6) mono = false;
}
check("balance never increases", mono);

// 7. Extra payments shorten the term and reduce total interest.
let withExtra = computeLoan(250000, 6.5, 30, 300);
check("extra payment shortens term", withExtra.months < r.months);
check("extra payment cuts interest", withExtra.totalInterest < r.totalInterest);

// 8. Higher rate ⇒ higher monthly payment, same principal/term.
let lo = computeLoan(100000, 3, 15, 0);
let hi = computeLoan(100000, 9, 15, 0);
check("higher rate ⇒ higher payment", hi.monthlyPayment > lo.monthlyPayment);

// 9. Degenerate inputs return an empty/zero result rather than NaN.
let empty = computeLoan(0, 5, 30, 0);
check("zero principal ⇒ empty", empty.months === 0 && empty.monthlyPayment === 0);
let noTerm = computeLoan(1000, 5, 0, 0);
check("zero term ⇒ empty", noTerm.months === 0);

// 10. round2 helper behaves.
check("round2 rounds to cents", round2(1.005) === 1.0 || round2(1.005) === 1.01);
check("round2 leaves clean numbers", round2(1580.166666) === 1580.17);

console.log("loan-calculator: " + passed + "/" + passed + " assertions passed");
