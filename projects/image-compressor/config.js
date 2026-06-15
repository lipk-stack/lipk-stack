/*
 * Image Compressor — monetization config (all optional, all zero-cost to set up).
 * Fill in ONCE with your own accounts to switch revenue on. Anything left as ""
 * is simply hidden, so the tool stays clean before you monetize.
 *
 *  - tipUrl:     A free Ko-fi / Buy-Me-a-Coffee page for tips.
 *  - proUrl:     A Gumroad / Lemon Squeezy product (e.g. "Batch Pro: ZIP export
 *                + bulk presets"). Free to create; they take a cut only on sales.
 *  - affiliates: Referral links to tools image-heavy users already need
 *                (stock photos, cloud storage, a CDN). You earn on sign-ups.
 *
 * These require YOUR identity + payout details and cannot be created
 * automatically. That one-time setup is the only step before real revenue.
 */
window.TOOL_CONFIG = {
  tipLabel: "This tool is free & private — buy me a coffee",
  tipUrl: "",            // e.g. "https://buymeacoffee.com/yourname"

  proLabel: "Batch Pro — compress folders & export as ZIP",
  proUrl: "",            // e.g. "https://yourname.gumroad.com/l/image-batch-pro"

  affiliates: [
    // { label: "Unlimited cloud storage with pCloud", url: "https://...your-ref..." },
    // { label: "Royalty-free stock photos", url: "https://...your-ref..." },
  ],
};
