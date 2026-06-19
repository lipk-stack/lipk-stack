/*
 * JSON Formatter & Validator — monetization config (all optional, all zero-cost).
 * Fill in ONCE with your own accounts to switch revenue on. Anything left as ""
 * is hidden, so the tool stays clean before you monetize.
 *
 *  - tipUrl:     A free Ko-fi / Buy-Me-a-Coffee page for tips.
 *  - proUrl:     A product page (e.g. a developer cheat-sheet / snippet pack on Gumroad).
 *  - affiliates: Referral links to things developers genuinely use — an API client
 *                (Postman alternative), a managed database/host, a monitoring or
 *                error-tracking service. Developer-tool programs convert well next
 *                to a JSON tool and several pay strong per-signup commissions.
 *
 * These require YOUR identity + payout details and cannot be created
 * automatically. That one-time setup is the only step before real revenue.
 */
window.TOOL_CONFIG = {
  tipLabel: "Free & private — buy me a coffee",
  tipUrl: "",            // e.g. "https://buymeacoffee.com/yourname"

  proLabel: "Get the developer cheat-sheet pack",
  proUrl: "",            // e.g. "https://yourname.gumroad.com/l/dev-cheatsheets"

  affiliates: [
    // Developer-audience offers convert well next to a JSON tool:
    // { label: "Test APIs faster with this client", url: "https://...your-ref..." },
    // { label: "Deploy a database in minutes", url: "https://...your-ref..." },
  ],
};
