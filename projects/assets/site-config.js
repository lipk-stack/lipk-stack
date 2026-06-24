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
  // Tip jar — Buy Me a Coffee works with Wise in Malaysia. Free to sign up.
  // Sign up at buymeacoffee.com -> connect Wise -> paste your page URL here.
  tipUrl: "", // e.g. "https://buymeacoffee.com/yourname"
  tipLabel: "This tool is free — buy me a coffee ☕",

  // Optional digital product link (shown on link-in-bio page and get-paid-playbook).
  proUrl: "", // e.g. "https://yourname.gumroad.com/l/get-paid-playbook"
  proLabel: "Get the Get-Paid Playbook →",

  // Social channels — shown on the link-in-bio page (/linkinbio/).
  youtubeUrl: "", // e.g. "https://youtube.com/@yourchannel"
  xhsUrl:     "", // e.g. "https://www.xiaohongshu.com/user/profile/your-id"
};
