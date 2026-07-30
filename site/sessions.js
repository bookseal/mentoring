/*
 * sessions.js — the left sidebar (public, committed).
 *
 * Renders the portal link + session list, nests the active session's in-page
 * TOC under it, and provides: a resizable / collapsible sidebar (persisted to
 * localStorage) and a WHOLE-SITE keyword search. The search fetches every page
 * client-side, builds an index, and shows matches across all sessions with the
 * term highlighted; landing on a result page highlights the term in place.
 * All of this is shared here so per-page markup stays untouched.
 */
(function () {
  window.MENTORING_SESSIONS = [
    { id: "2026-07-17", date: "2026-07-17", title: "WTIA 첫 세션", summary: "네트워킹·로보틱스·비자·창업 — 미국 진출의 지형", href: "2026-07-17.html", status: "done" },
    { id: "2026-07-24", date: "2026-07-24", title: "미국 진출·커리어 정리", summary: "문화·시장·Upstage·비자를 주제별로 정리", href: "2026-07-24.html", status: "done" },
    { id: "2026-07-31", date: "2026-07-31", title: "다음 질문", summary: "권력·AGI·Upstage 비자·로보틱스 — 앞으로 물어볼 것", href: "2026-07-31.html", status: "upcoming" },
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }

  function sessionMarkup(s, cur) {
    var active = s.id === cur;
    return (
      '<a class="s-item' + (active ? " active" : "") + '" href="' + s.href + '"' +
      (active ? ' aria-current="page"' : "") + ">" +
      '<span class="s-date">' + s.date + "</span>" +
      '<span class="s-title">' + s.title + "</span>" +
      (s.summary ? '<span class="s-sum">' + s.summary + "</span>" : "") +
      (s.status === "empty" ? '<span class="s-badge">empty</span>' :
       s.status === "upcoming" ? '<span class="s-badge">예정</span>' : "") +
      "</a>"
    );
  }

  function subTocMarkup() {
    var links = document.querySelectorAll("main .toc a[href^='#']");
    if (!links.length) return "";
    var items = Array.prototype.map.call(links, function (a) {
      return '<a class="s-toc-item" href="' + a.getAttribute("href") + '">' + esc(a.textContent.trim()) + "</a>";
    }).join("");
    return '<div class="s-toc">' + items + "</div>";
  }

  /* ---------------- whole-site search ---------------- */
  var INDEX = null, indexing = null;

  function pagesToIndex() {
    var seen = {}, pages = [{ href: "index.html", title: "Almanac" }];
    window.MENTORING_SESSIONS.forEach(function (s) { pages.push({ href: s.href, title: s.title }); });
    return pages.filter(function (p) { if (seen[p.href]) return false; seen[p.href] = 1; return true; });
  }

  function buildIndex() {
    if (INDEX) return Promise.resolve(INDEX);
    if (indexing) return indexing;
    indexing = Promise.all(pagesToIndex().map(function (p) {
      return fetch(p.href).then(function (r) { return r.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        return Array.prototype.map.call(doc.querySelectorAll("main .card"), function (card) {
          var title = "";
          var h = card.querySelector("h2");
          if (h) { var c = h.cloneNode(true); var chip = c.querySelector(".chip"); if (chip) chip.remove(); title = c.textContent.replace(/\s+/g, " ").trim(); }
          return { href: p.href, sess: p.title, id: card.id || "", title: title, text: (card.textContent || "").replace(/\s+/g, " ").trim() };
        });
      }).catch(function () { return []; });
    })).then(function (lists) {
      INDEX = lists.reduce(function (a, b) { return a.concat(b); }, []);
      return INDEX;
    });
    return indexing;
  }

  function markStr(s, term) {
    var low = String(s).toLowerCase(), t = term.toLowerCase(), i = low.indexOf(t);
    if (i < 0) return esc(s);
    return esc(s.slice(0, i)) + "<mark>" + esc(s.slice(i, i + term.length)) + "</mark>" + esc(s.slice(i + term.length));
  }
  function snippet(text, term) {
    var i = text.toLowerCase().indexOf(term.toLowerCase());
    if (i < 0) return "";
    var start = Math.max(0, i - 38), end = Math.min(text.length, i + term.length + 52);
    return (start > 0 ? "…" : "") + esc(text.slice(start, i)) +
           "<mark>" + esc(text.slice(i, i + term.length)) + "</mark>" +
           esc(text.slice(i + term.length, end)) + (end < text.length ? "…" : "");
  }

  function runSearch(term) {
    term = (term || "").trim();
    var box = document.querySelector(".s-search-wrap .s-results");
    if (!box) return;
    if (term.length < 1) { box.innerHTML = ""; box.style.display = "none"; return; }
    buildIndex().then(function (idx) {
      var t = term.toLowerCase();
      var hits = idx.filter(function (r) { return r.text.toLowerCase().indexOf(t) >= 0 || r.title.toLowerCase().indexOf(t) >= 0; });
      if (!hits.length) { box.innerHTML = '<div class="r-count">결과 없음</div>'; box.style.display = ""; return; }
      box.innerHTML = '<div class="r-count">' + hits.length + "개 결과</div>" + hits.map(function (r) {
        var url = r.href + "?q=" + encodeURIComponent(term) + (r.id ? "#" + r.id : "");
        return '<a class="s-result" href="' + url + '">' +
          '<span class="r-sess">' + esc(r.sess) + "</span>" +
          '<span class="r-title">' + markStr(r.title, term) + "</span>" +
          '<span class="r-snip">' + (snippet(r.text, term) || "") + "</span>" +
        "</a>";
      }).join("");
      box.style.display = "";
    });
  }

  function mountSearch() {
    var side = document.querySelector(".sidebar");
    if (!side || document.getElementById("kwSearch")) return;
    var wrap = document.createElement("div");
    wrap.className = "s-search-wrap";
    wrap.innerHTML =
      '<div class="s-results" style="display:none"></div>' +
      '<input id="kwSearch" class="s-search" type="search" placeholder="전체 검색…" autocomplete="off" spellcheck="false">';
    side.appendChild(wrap);
    var input = document.getElementById("kwSearch");
    input.addEventListener("input", function () { runSearch(input.value); });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.value = ""; runSearch(""); } });
  }

  /* --------- highlight the term on the page you land on (?q=) --------- */
  function markAll(root, term) {
    var t = term.toLowerCase();
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var targets = [], n;
    while ((n = walker.nextNode())) {
      var p = n.parentNode;
      if (!n.nodeValue || !n.nodeValue.trim()) continue;
      if (p && /^(SCRIPT|STYLE|MARK)$/.test(p.nodeName)) continue;
      if (n.nodeValue.toLowerCase().indexOf(t) >= 0) targets.push(n);
    }
    targets.forEach(function (tn) {
      var val = tn.nodeValue, low = val.toLowerCase(), out = "", idx = 0, k;
      while ((k = low.indexOf(t, idx)) >= 0) {
        out += esc(val.slice(idx, k)) + '<mark class="kw">' + esc(val.slice(k, k + term.length)) + "</mark>";
        idx = k + term.length;
      }
      out += esc(val.slice(idx));
      var span = document.createElement("span");
      span.innerHTML = out;
      tn.parentNode.replaceChild(span, tn);
    });
  }
  function highlightPageFromQuery() {
    var m = /[?&]q=([^&]*)/.exec(location.search);
    if (!m) return;
    var term = decodeURIComponent(m[1].replace(/\+/g, " ")).trim();
    if (!term) return;
    var main = document.querySelector("main");
    if (main) markAll(main, term);
    var input = document.getElementById("kwSearch");
    if (input) input.value = term;
    if (location.hash) {
      var el = document.querySelector(location.hash);
      if (el && el.scrollIntoView) setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 0);
    }
  }

  /* ---------------- resize + collapse (persisted) ---------------- */
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function applyPrefs() {
    var w = read("almanac.sidebarW");
    if (w) document.documentElement.style.setProperty("--sidebar-w", w);
    if (read("almanac.sidebarCollapsed") === "1") document.body.classList.add("sidebar-collapsed");
  }
  function setCollapsed(v) {
    document.body.classList.toggle("sidebar-collapsed", v);
    store("almanac.sidebarCollapsed", v ? "1" : "0");
  }
  function mountControls() {
    var side = document.querySelector(".sidebar");
    if (!side) return;
    if (!document.getElementById("sideHide")) {
      var hide = document.createElement("button");
      hide.id = "sideHide"; hide.className = "s-hide"; hide.type = "button";
      hide.title = "사이드바 숨기기"; hide.setAttribute("aria-label", "사이드바 숨기기"); hide.textContent = "«";
      side.insertBefore(hide, side.firstChild);
      hide.addEventListener("click", function () { setCollapsed(true); });
    }
    if (!document.getElementById("sideShow")) {
      var show = document.createElement("button");
      show.id = "sideShow"; show.className = "s-show"; show.type = "button";
      show.title = "사이드바 보이기"; show.setAttribute("aria-label", "사이드바 보이기"); show.textContent = "»";
      document.body.appendChild(show);
      show.addEventListener("click", function () { setCollapsed(false); });
    }
    if (!document.getElementById("sideResize")) {
      var grip = document.createElement("div");
      grip.id = "sideResize"; grip.className = "s-resize";
      grip.setAttribute("role", "separator"); grip.setAttribute("aria-orientation", "vertical");
      document.body.appendChild(grip);
      grip.addEventListener("mousedown", function (e) {
        e.preventDefault();
        document.body.style.userSelect = "none"; document.body.style.cursor = "col-resize";
        function move(ev) {
          var w = Math.min(440, Math.max(150, ev.clientX));
          document.documentElement.style.setProperty("--sidebar-w", w + "px");
        }
        function up() {
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
          document.body.style.userSelect = ""; document.body.style.cursor = "";
          store("almanac.sidebarW", getComputedStyle(document.documentElement).getPropertyValue("--sidebar-w").trim());
        }
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      });
      grip.addEventListener("dblclick", function () {   // double-click to reset width
        document.documentElement.style.removeProperty("--sidebar-w");
        try { localStorage.removeItem("almanac.sidebarW"); } catch (e) {}
      });
    }
  }

  /* ---------------- render ---------------- */
  function render() {
    var host = document.getElementById("sessionNav");
    if (!host) return;
    var cur = (document.body && document.body.getAttribute("data-session")) || "";
    var home =
      '<a class="s-item s-home' + (cur === "portal" ? " active" : "") + '" href="index.html"' +
      (cur === "portal" ? ' aria-current="page"' : "") + ">" +
      '<span class="s-title">📚 Almanac 포털</span>' +
      '<span class="s-sum">시스템 소개 · 세션 인덱스</span>' +
      "</a>";
    host.innerHTML = home + window.MENTORING_SESSIONS.map(function (s) { return sessionMarkup(s, cur); }).join("");

    var activeEl = host.querySelector(".s-item.active");
    var sub = subTocMarkup();
    if (activeEl && sub) {
      activeEl.insertAdjacentHTML("afterend", sub);
      document.body.classList.add("has-sidetoc");
    }
    mountSearch();
    mountControls();
    highlightPageFromQuery();
  }

  applyPrefs();   // set width / collapsed before paint
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  window.renderSessionSidebar = render;
})();
