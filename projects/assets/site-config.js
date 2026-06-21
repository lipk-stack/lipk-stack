/*
 * Site-wide monetization config — ONE place to switch revenue on.
 *
 * Fill `tipUrl` here ONCE and the tip button lights up on EVERY tool in the
 * collection. Each tool's own config.js can still override any field and add
 * tool-specific affiliate links. Anything left "" stays hidden, so the whole
 * site is clean and fully functional before you monetize.
 *
 * These require YOUR identity + payout details and cannot be set up
 * automatically. That one-time, zero-cost setup is the only step before
 * real revenue starts flowing.
 */
window.SITE_CONFIG = {
  // A free Ko-fi / Buy-Me-a-Coffee page — shown as a tip button on every tool.
  tipUrl: "", // e.g. "https://buymeacoffee.com/yourname"
  tipLabel: "This tool is free — buy me a coffee",

  // Optional default product link (any tool's config.js can override this).
  proUrl: "", // e.g. "https://yourname.gumroad.com/l/your-product"
  proLabel: "Upgrade to Pro",
};
