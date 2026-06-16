/*
 * Loan & Mortgage Calculator — monetization config (all optional, all zero-cost).
 * Fill in ONCE with your own accounts to switch revenue on. Anything left as ""
 * is hidden, so the tool stays clean before you monetize.
 *
 *  - tipUrl:     A free Ko-fi / Buy-Me-a-Coffee page for tips.
 *  - proUrl:     A product page (e.g. a budgeting / debt-payoff spreadsheet on Gumroad).
 *  - affiliates: Referral links to things loan/mortgage shoppers genuinely use —
 *                refinance marketplaces, high-yield savings accounts, budgeting
 *                apps. Personal-finance offers pay some of the highest commissions.
 *
 * These require YOUR identity + payout details and cannot be created
 * automatically. That one-time setup is the only step before real revenue.
 */
window.TOOL_CONFIG = {
  tipLabel: "Free & private — buy me a coffee",
  tipUrl: "",            // e.g. "https://buymeacoffee.com/yourname"

  proLabel: "Get the debt-payoff & budgeting spreadsheet",
  proUrl: "",            // e.g. "https://yourname.gumroad.com/l/payoff-planner"

  affiliates: [
    // Personal-finance offers convert well next to a loan calculator:
    // { label: "Compare refinance rates", url: "https://...your-ref..." },
    // { label: "Open a high-yield savings account", url: "https://...your-ref..." },
    // { label: "Track your budget with this app", url: "https://...your-ref..." },
  ],
};
