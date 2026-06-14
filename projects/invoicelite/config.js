/*
 * InvoiceLite — Monetization config
 * --------------------------------
 * Fill these in ONCE with your own accounts to switch revenue on.
 * Everything is optional: any value left as "" is simply hidden in the UI,
 * so the tool stays clean and fully functional even before you monetize.
 *
 * Where the money comes from (all zero-cost to set up):
 *  - tipUrl:      A "Buy Me a Coffee" / Ko-fi page (free to create) for tips.
 *  - proUrl:      A Gumroad/Lemon Squeezy product page selling a "Pro template
 *                 pack" or "remove footer + extra themes" (free to create; they
 *                 take a small cut only when you actually sell).
 *  - affiliates:  Referral links to tools your users already need. You earn a
 *                 commission when they sign up. Sign-ups are free.
 *
 * None of these can be created autonomously — they require YOUR identity and
 * bank/payout details. That 10-minute setup is the only thing between this
 * live tool and real revenue.
 */
window.INVOICELITE_CONFIG = {
  // e.g. "https://buymeacoffee.com/yourname"
  tipUrl: "",

  // e.g. "https://yourname.gumroad.com/l/invoice-pro"
  proUrl: "",

  // Affiliate links shown as "Recommended tools" in the sidebar.
  // label = what the user sees, url = your referral link.
  affiliates: [
    // { label: "Get paid online with Wise", url: "https://wise.com/invite/..." },
    // { label: "Track expenses with Wave", url: "https://www.waveapps.com/?ref=..." },
  ],
};
