/*
 * Image Compressor & Resizer — 100% client-side.
 * Re-encodes images with the Canvas API. No network, no dependencies.
 */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var drop = $("drop"), fileInput = $("file"), results = $("results");
  var formatSel = $("format"), qualityEl = $("quality"), qVal = $("qVal"), maxwEl = $("maxw");

  // Keep the originals so changing quality/size re-renders without re-picking files.
  var loaded = []; // { name, type, size, img }

  function humanSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  function baseName(name) {
    var dot = name.lastIndexOf(".");
    return dot > 0 ? name.slice(0, dot) : name;
  }

  function extFor(mime) {
    return mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
  }

  // Load a File into an HTMLImageElement via object URL.
  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("Could not read " + file.name)); };
      img.src = url;
    });
  }

  // Compress one loaded entry to a Blob using the current settings.
  function compress(entry) {
    return new Promise(function (resolve) {
      var img = entry.img;
      var maxw = parseInt(maxwEl.value, 10) || 0;
      var w = img.naturalWidth, h = img.naturalHeight;
      if (maxw > 0 && w > maxw) { h = Math.round(h * (maxw / w)); w = maxw; }

      var canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      var ctx = canvas.getContext("2d");
      // White matte when flattening transparency into JPEG.
      var outType = formatSel.value;
      if (outType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.drawImage(img, 0, 0, w, h);

      var quality = parseFloat(qualityEl.value);
      canvas.toBlob(function (blob) {
        resolve({ blob: blob, w: w, h: h });
      }, outType, quality);
    });
  }

  function card(entry, out) {
    var saved = entry.size - out.blob.size;
    var pct = entry.size > 0 ? Math.round((saved / entry.size) * 100) : 0;
    var url = URL.createObjectURL(out.blob);
    var newName = baseName(entry.name) + "-min." + extFor(formatSel.value);

    var el = document.createElement("div");
    el.className = "card";
    el.style.display = "flex";
    el.style.gap = "1rem";
    el.style.alignItems = "center";
    el.style.flexWrap = "wrap";

    var thumb = document.createElement("img");
    thumb.src = url;
    thumb.alt = entry.name;
    thumb.style.width = "84px";
    thumb.style.height = "84px";
    thumb.style.objectFit = "cover";
    thumb.style.borderRadius = "8px";
    thumb.style.background = "#0b1220";

    var info = document.createElement("div");
    info.style.flex = "1 1 200px";
    info.style.minWidth = "0";
    var savedLabel = pct >= 0
      ? '<span style="color:#34d399">↓ ' + pct + '% smaller</span>'
      : '<span style="color:#f59e0b">+ ' + Math.abs(pct) + '% (try lower quality)</span>';
    info.innerHTML =
      '<div style="font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' +
        esc(entry.name) + "</div>" +
      '<div class="muted" style="font-size:.85rem; margin-top:.2rem;">' +
        humanSize(entry.size) + " → <strong class='mono'>" + humanSize(out.blob.size) + "</strong> · " +
        savedLabel + " · " + out.w + "×" + out.h + "</div>";

    var dl = document.createElement("a");
    dl.className = "btn primary";
    dl.href = url;
    dl.download = newName;
    dl.textContent = "Download";
    dl.style.textDecoration = "none";
    dl.style.flex = "0 0 auto";

    el.appendChild(thumb);
    el.appendChild(info);
    el.appendChild(dl);
    return el;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderAll() {
    results.innerHTML = "";
    if (!loaded.length) return;
    var header = document.createElement("p");
    header.className = "muted";
    header.style.margin = "1.4rem 0 .4rem";
    header.textContent = loaded.length + " image" + (loaded.length > 1 ? "s" : "") + " ready:";
    results.appendChild(header);

    loaded.forEach(function (entry) {
      compress(entry).then(function (out) {
        results.appendChild(card(entry, out));
      });
    });
  }

  function addFiles(fileList) {
    var files = Array.prototype.slice.call(fileList).filter(function (f) {
      return /^image\/(png|jpeg|webp)$/.test(f.type);
    });
    if (!files.length) return;
    var pending = files.length;
    files.forEach(function (f) {
      loadImage(f).then(function (img) {
        loaded.push({ name: f.name, type: f.type, size: f.size, img: img });
      }).catch(function () { /* skip unreadable */ })
        .then(function () { if (--pending === 0) renderAll(); });
    });
  }

  // --- Wiring ----------------------------------------------------------------
  drop.addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () { addFiles(fileInput.files); fileInput.value = ""; });

  ["dragenter", "dragover"].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("drag"); });
  });
  ["dragleave", "drop"].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("drag"); });
  });
  drop.addEventListener("drop", function (e) {
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });

  qualityEl.addEventListener("input", function () { qVal.textContent = parseFloat(qualityEl.value).toFixed(2); renderAll(); });
  formatSel.addEventListener("change", renderAll);
  maxwEl.addEventListener("change", renderAll);
})();
