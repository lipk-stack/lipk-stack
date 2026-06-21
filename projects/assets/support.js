/*
 * Shared monetization rail for every tool in the collection.
 * A tool opts in by defining `window.TOOL_CONFIG` (see each tool's config.js)
 * and placing an empty <div id="supportRail" class="support" hidden></div>.
 *
 * Universal links (tip jar / default product) come from window.SITE_CONFIG
 * (assets/site-config.js) so they can be switched on for the whole site by
 * editing one file; a tool's own TOOL_CONFIG overrides any field and adds its
 * tool-specific affiliate links.
 *
 * Every link is OPTIONAL: anything left blank is simply not shown, so the tool
 * stays clean and fully functional before any monetization is switched on.
 * None of these can be created autonomously — they require the owner's identity
 * and payout details. That one-time setup is the only step before real revenue.
 */
(function () {
  var site = window.SITE_CONFIG || {};
  var cfg = window.TOOL_CONFIG || {};
  var rail = document.getElementById("supportRail");
  if (!rail) return;

  // Per-tool values win; otherwise fall back to the site-wide defaults.
  var proUrl = cfg.proUrl || site.proUrl;
  var proLabel = cfg.proLabel || site.proLabel || "Upgrade to Pro";
  var tipUrl = cfg.tipUrl || site.tipUrl;
  var tipLabel = cfg.tipLabel || site.tipLabel || "This tool is free — buy me a coffee";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var html = "";
  var any = false;

  if (proUrl) {
    html += '<a class="pro" href="' + esc(proUrl) + '" target="_blank" rel="noopener">⭐ ' +
            esc(proLabel) + "</a>";
    any = true;
  }
  if (tipUrl) {
    html += '<a class="tip" href="' + esc(tipUrl) + '" target="_blank" rel="noopener">☕ ' +
            esc(tipLabel) + "</a>";
    any = true;
  }
  if (cfg.affiliates && cfg.affiliates.length) {
    html += "<h3>RECOMMENDED TOOLS</h3>";
    cfg.affiliates.forEach(function (a) {
      if (a && a.url) {
        html += '<a class="aff" href="' + esc(a.url) + '" target="_blank" rel="noopener sponsored">' +
                esc(a.label || a.url) + " →</a>";
      }
    });
    any = true;
  }

  if (any) {
    rail.innerHTML = html;
    rail.hidden = false;
  }
})();
