/*
 * Password Generator — monetization config (all optional, all zero-cost).
 * Fill in ONCE with your own accounts to switch revenue on. Anything left as ""
 * is hidden, so the tool stays clean before you monetize.
 *
 *  - tipUrl:     A free Ko-fi / Buy-Me-a-Coffee page for tips.
 *  - proUrl:     A product page (e.g. a short "password & 2FA security" guide).
 *  - affiliates: Referral links to a password manager / VPN users genuinely
 *                need. These pay some of the highest affiliate commissions online.
 *
 * These require YOUR identity + payout details and cannot be created
 * automatically. That one-time setup is the only step before real revenue.
 */
window.TOOL_CONFIG = {
  tipLabel: "Free & private — buy me a coffee",
  tipUrl: "",            // e.g. "https://buymeacoffee.com/yourname"

  proLabel: "Get the 1-page account-security checklist",
  proUrl: "",            // e.g. "https://yourname.gumroad.com/l/secure-checklist"

  affiliates: [
    // Password managers / VPNs pay strong recurring commissions:
    // { label: "Store passwords safely with a password manager", url: "https://...your-ref..." },
    // { label: "Protect your connection with a VPN", url: "https://...your-ref..." },
  ],
};
