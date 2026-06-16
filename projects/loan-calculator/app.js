/*
 * Loan & Mortgage Calculator — 100% client-side, nothing uploaded.
 * The financial math is written to also run under Node for testing (see the
 * export at the bottom). In the browser it wires up the UI.
 *
 * Standard amortizing-loan formula. For an annual rate that is not zero:
 *   monthlyRate r = annualRatePct / 100 / 12
 *   payment     M = P * r / (1 - (1 + r)^-n)
 * For a zero-interest loan the payment is simply principal / months.
 */
(function (root) {
  "use strict";

  function round2(x) {
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }

  /**
   * Compute a loan's monthly payment, totals and full amortization schedule.
   * @param {number} principal     Amount borrowed (>= 0).
   * @param {number} annualRatePct Annual interest rate as a percent, e.g. 6.5.
   * @param {number} years         Term length in years (> 0).
   * @param {number} [extra=0]     Optional fixed extra payment applied each month.
   * @returns {{monthlyPayment:number,totalPaid:number,totalInterest:number,
   *            months:number,schedule:Array}}
   */
  function computeLoan(principal, annualRatePct, years, extra) {
    principal = Number(principal) || 0;
    annualRatePct = Number(annualRatePct) || 0;
    years = Number(years) || 0;
    extra = Number(extra) || 0;

    var n = Math.round(years * 12);
    if (principal <= 0 || n <= 0) {
      return { monthlyPayment: 0, totalPaid: 0, totalInterest: 0, months: 0, schedule: [] };
    }

    var r = annualRatePct / 100 / 12;
    var basePayment;
    if (r === 0) {
      basePayment = principal / n;
    } else {
      basePayment = (principal * r) / (1 - Math.pow(1 + r, -n));
    }

    // Walk the schedule month by month so extra payments and the final
    // partial payment are handled exactly (and rounding never drifts).
    var balance = principal;
    var totalInterest = 0;
    var totalPaid = 0;
    var schedule = [];
    var guard = n + 1200; // hard cap so extra payments can't loop forever

    for (var i = 1; balance > 0.005 && i <= guard; i++) {
      var interest = balance * r;
      var scheduled = basePayment + extra;
      var principalPaid = scheduled - interest;

      // Never pay more principal than is owed on the last installment.
      if (principalPaid >= balance) {
        principalPaid = balance;
        scheduled = principalPaid + interest;
      }

      balance -= principalPaid;
      totalInterest += interest;
      totalPaid += scheduled;

      schedule.push({
        month: i,
        payment: round2(scheduled),
        principal: round2(principalPaid),
        interest: round2(interest),
        balance: round2(Math.max(balance, 0)),
      });
    }

    return {
      monthlyPayment: round2(basePayment + extra),
      totalPaid: round2(totalPaid),
      totalInterest: round2(totalInterest),
      months: schedule.length,
      schedule: schedule,
    };
  }

  // ---- Browser UI (skipped under Node) -----------------------------------
  if (typeof document !== "undefined") {
    var $ = function (id) { return document.getElementById(id); };

    var CURRENCIES = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$",
      CAD: "C$", SGD: "S$", INR: "₹", MYR: "RM",
    };

    function fmt(n, sym) {
      return sym + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function render() {
      var sym = CURRENCIES[$("currency").value] || "$";
      var res = computeLoan(
        parseFloat($("amount").value),
        parseFloat($("rate").value),
        parseFloat($("years").value),
        parseFloat($("extra").value)
      );

      if (!res.months) {
        $("summary").innerHTML = '<p class="muted">Enter an amount, rate and term to see your payment.</p>';
        $("schedWrap").hidden = true;
        return;
      }

      $("summary").innerHTML =
        '<div class="stat"><span>Monthly payment</span><strong>' + fmt(res.monthlyPayment, sym) + "</strong></div>" +
        '<div class="stat"><span>Total interest</span><strong>' + fmt(res.totalInterest, sym) + "</strong></div>" +
        '<div class="stat"><span>Total paid</span><strong>' + fmt(res.totalPaid, sym) + "</strong></div>" +
        '<div class="stat"><span>Payoff time</span><strong>' +
          Math.floor(res.months / 12) + "y " + (res.months % 12) + "m</strong></div>";

      // Show a compact schedule: every payment up to 12, then yearly milestones.
      var rows = res.schedule.filter(function (p, idx) {
        return idx < 12 || p.month % 12 === 0 || p.month === res.months;
      });
      var body = rows.map(function (p) {
        return "<tr><td>" + p.month + "</td><td>" + fmt(p.payment, sym) +
          "</td><td>" + fmt(p.principal, sym) + "</td><td>" + fmt(p.interest, sym) +
          "</td><td>" + fmt(p.balance, sym) + "</td></tr>";
      }).join("");
      $("schedBody").innerHTML = body;
      $("schedWrap").hidden = false;
    }

    document.addEventListener("DOMContentLoaded", function () {
      ["amount", "rate", "years", "extra", "currency"].forEach(function (id) {
        $(id).addEventListener("input", render);
        $(id).addEventListener("change", render);
      });
      render();
    });
  }

  // ---- Export for tests ---------------------------------------------------
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { computeLoan: computeLoan, round2: round2 };
  } else if (root) {
    root.LoanCalc = { computeLoan: computeLoan, round2: round2 };
  }
})(typeof window !== "undefined" ? window : this);
