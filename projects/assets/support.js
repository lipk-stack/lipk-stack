/*
 * Shared monetization rail for every tool in the collection.
 * A tool opts in by defining `window.TOOL_CONFIG` (see each tool's config.js)
 * and placing an empty <div id="supportRail" class="support" hidden></div>.
 *
 * Every link is OPTIONAL: anything left blank is simply not shown, so the tool
 * stays clean and fully functional before any monetization is switched on.
 * None of these can be created autonomously — they require the owner's identity
 * and payout details. That one-time setup is the only step before real revenue.
 */
(function () {
  var cfg = window.TOOL_CONFIG || {};
  var rail = document.getElementById("supportRail");
  if (!rail) return;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var html = "";
  var any = false;

  if (cfg.proUrl) {
    html += '<a class="pro" href="' + esc(cfg.proUrl) + '" target="_blank" rel="noopener">⭐ ' +
            esc(cfg.proLabel || "Upgrade to Pro") + "</a>";
    any = true;
  }
  if (cfg.tipUrl) {
    html += '<a class="tip" href="' + esc(cfg.tipUrl) + '" target="_blank" rel="noopener">☕ ' +
            esc(cfg.tipLabel || "This tool is free — buy me a coffee") + "</a>";
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
