/* InvoiceLite — 100% client-side invoice/quote generator.
 * No backend, no dependencies, no tracking. State persists in localStorage. */
(function () {
  "use strict";

  var STORE_KEY = "invoicelite.v1";
  var $ = function (id) { return document.getElementById(id); };

  // --- Default / sample data -------------------------------------------------
  function emptyState() {
    var today = new Date().toISOString().slice(0, 10);
    var due = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);
    return {
      docType: "INVOICE", currency: "$", invNumber: "INV-0001",
      invDate: today, dueDate: due, accent: "#0d9488",
      from: "", to: "", taxRate: 0, discount: 0, notes: "",
      items: [{ desc: "", qty: 1, rate: 0 }],
    };
  }

  function sampleState() {
    var s = emptyState();
    s.from = "Acme Studio\n12 Maker Lane\nKuala Lumpur, MY\nhello@acme.studio";
    s.to = "Globex Corp\nAttn: Accounts\n900 Market St\npay@globex.com";
    s.notes = "Payment due within 14 days.\nBank transfer: Acme Studio · 1234-5678\nThank you for your business!";
    s.taxRate = 6;
    s.items = [
      { desc: "Brand identity design", qty: 1, rate: 1200 },
      { desc: "Landing page (UI + build)", qty: 1, rate: 850 },
      { desc: "Revisions (hourly)", qty: 4, rate: 60 },
    ];
    return s;
  }

  // --- State -----------------------------------------------------------------
  var state = load() || emptyState();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)); }
    catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // --- Helpers ---------------------------------------------------------------
  function money(n) {
    var v = isFinite(n) ? n : 0;
    return state.currency + v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : 0; }
  function esc(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function totals() {
    var subtotal = state.items.reduce(function (a, it) { return a + num(it.qty) * num(it.rate); }, 0);
    var discount = num(state.discount);
    var taxable = Math.max(0, subtotal - discount);
    var tax = taxable * num(state.taxRate) / 100;
    return { subtotal: subtotal, discount: discount, tax: tax, total: taxable + tax };
  }

  // --- Render editor item rows ----------------------------------------------
  function renderItems() {
    var wrap = $("items");
    wrap.innerHTML = "";
    state.items.forEach(function (it, i) {
      var row = document.createElement("div");
      row.className = "item-row";
      row.innerHTML =
        '<input data-k="desc" data-i="' + i + '" placeholder="Description" value="' + esc(it.desc) + '">' +
        '<input data-k="qty" data-i="' + i + '" type="number" min="0" step="any" value="' + it.qty + '">' +
        '<input data-k="rate" data-i="' + i + '" type="number" min="0" step="any" value="' + it.rate + '">' +
        '<button class="item-del" data-del="' + i + '" title="Remove" type="button">×</button>';
      wrap.appendChild(row);
    });
  }

  // --- Render preview (the printable paper) ----------------------------------
  function renderPreview() {
    document.documentElement.style.setProperty("--accent", state.accent);
    $("pTitle").textContent = state.docType;
    $("pFrom").textContent = state.from || "Your business details…";
    $("pTo").textContent = state.to || "Client details…";
    $("pNumber").textContent = state.invNumber || "—";
    $("pDate").textContent = state.invDate || "—";

    var showDue = state.docType !== "RECEIPT" && state.dueDate;
    $("pDueRow").style.display = showDue ? "" : "none";
    $("pDue").textContent = state.dueDate || "";

    var body = $("pItems");
    body.innerHTML = "";
    state.items.forEach(function (it) {
      var amount = num(it.qty) * num(it.rate);
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + esc(it.desc || "—") + "</td>" +
        '<td class="num">' + (num(it.qty) || 0) + "</td>" +
        '<td class="num">' + money(num(it.rate)) + "</td>" +
        '<td class="num">' + money(amount) + "</td>";
      body.appendChild(tr);
    });

    var t = totals();
    $("pSubtotal").textContent = money(t.subtotal);
    $("pDiscRow").style.display = t.discount > 0 ? "" : "none";
    $("pDiscount").textContent = "−" + money(t.discount);
    $("pTaxRow").style.display = num(state.taxRate) > 0 ? "" : "none";
    $("pTaxLbl").textContent = "Tax (" + num(state.taxRate) + "%)";
    $("pTax").textContent = money(t.tax);
    $("pTotal").textContent = money(t.total);

    var hasNotes = (state.notes || "").trim().length > 0;
    $("pNotesWrap").style.display = hasNotes ? "" : "none";
    $("pNotes").textContent = state.notes;
  }

  // --- Sync editor inputs -> state -------------------------------------------
  function bindFields() {
    var simple = ["docType", "currency", "invNumber", "invDate", "dueDate", "accent", "from", "to", "taxRate", "discount", "notes"];
    simple.forEach(function (k) {
      var el = $(k === "accent" ? "accent" : k);
      if (!el) return;
      el.addEventListener("input", function () {
        state[k] = (k === "taxRate" || k === "discount") ? num(el.value) : el.value;
        save(); renderPreview();
      });
    });

    $("items").addEventListener("input", function (e) {
      var t = e.target;
      if (t.dataset.k != null) {
        var i = +t.dataset.i, k = t.dataset.k;
        state.items[i][k] = (k === "desc") ? t.value : num(t.value);
        save(); renderPreview();
      }
    });
    $("items").addEventListener("click", function (e) {
      if (e.target.dataset.del != null) {
        state.items.splice(+e.target.dataset.del, 1);
        if (!state.items.length) state.items.push({ desc: "", qty: 1, rate: 0 });
        save(); renderItems(); renderPreview();
      }
    });

    $("addItem").addEventListener("click", function () {
      state.items.push({ desc: "", qty: 1, rate: 0 });
      save(); renderItems(); renderPreview();
    });
    $("printBtn").addEventListener("click", function () { window.print(); });
    $("resetBtn").addEventListener("click", function () {
      if (confirm("Clear this document and start fresh?")) { state = emptyState(); commit(); }
    });
    $("loadSample").addEventListener("click", function () { state = sampleState(); commit(); });
  }

  // Push state -> all editor fields (used on load / sample / reset)
  function fillFields() {
    ["docType", "currency", "invNumber", "invDate", "dueDate", "accent", "from", "to", "taxRate", "discount", "notes"]
      .forEach(function (k) { var el = $(k); if (el) el.value = state[k]; });
  }

  function commit() { save(); fillFields(); renderItems(); renderPreview(); }

  // --- Monetization rail (driven by config.js) -------------------------------
  function renderSupport() {
    var site = window.SITE_CONFIG || {};
    var cfg = window.INVOICELITE_CONFIG || {};
    // Per-tool values win; otherwise fall back to the site-wide defaults so the
    // owner can switch the tip jar on for every tool by editing one file.
    var proUrl = cfg.proUrl || site.proUrl;
    var tipUrl = cfg.tipUrl || site.tipUrl;
    var rail = $("supportRail"), any = false;

    if (proUrl) {
      $("proSlot").innerHTML = '<a class="pro" href="' + proUrl + '" target="_blank" rel="noopener">⭐ Get the Pro template pack</a>';
      any = true;
    }
    if (tipUrl) {
      $("tipSlot").innerHTML = '<a class="tip" href="' + tipUrl + '" target="_blank" rel="noopener">☕ This tool is free — buy me a coffee</a>';
      any = true;
    }
    if (cfg.affiliates && cfg.affiliates.length) {
      var html = "<h3>RECOMMENDED TOOLS</h3>";
      cfg.affiliates.forEach(function (a) {
        if (a && a.url) html += '<a class="aff" href="' + a.url + '" target="_blank" rel="noopener sponsored">' + esc(a.label || a.url) + " →</a>";
      });
      $("affSlot").innerHTML = html;
      any = true;
    }
    // Footer credit also links to tip page when available (gentle, removable via Pro).
    if (tipUrl) {
      var foot = $("pFoot");
      foot.innerHTML = 'Made with <a href="' + tipUrl + '" style="color:inherit">InvoiceLite</a>';
    }
    if (any) rail.hidden = false;
  }

  // --- Boot ------------------------------------------------------------------
  bindFields();
  commit();
  renderSupport();
})();
