/*
 * sessions.js — the left sidebar (public, committed).
 *
 * Renders: the portal home link + one entry per session, the ACTIVE session's
 * in-page table of contents nested directly under it, and a keyword filter
 * pinned to the bottom-left. One session = one page. To add a session: append
 * an entry below and create its page. Every page with an <aside> containing
 * <nav id="sessionNav"> and a <body data-session="..."> gets the sidebar filled
 * + its own entry marked active; the TOC mirrors that page's `main .toc`.
 */
(function () {
  window.MENTORING_SESSIONS = [
    { id: "2026-07-17", date: "2026-07-17", title: "WTIA 첫 세션", summary: "네트워킹·로보틱스·비자·창업 — 미국 진출의 지형", href: "2026-07-17.html", status: "done" },
    { id: "2026-07-24", date: "2026-07-24", title: "미국 진출·커리어 정리", summary: "문화·시장·Upstage·비자를 주제별로 정리", href: "2026-07-24.html", status: "done" },
    { id: "2026-07-31", date: "2026-07-31", title: "다음 질문", summary: "권력·AGI·Upstage 비자·로보틱스 — 앞으로 물어볼 것", href: "2026-07-31.html", status: "upcoming" },
  ];

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

  // Mirror the current page's in-page TOC (anchor links only) into the sidebar.
  function subTocMarkup() {
    var links = document.querySelectorAll("main .toc a[href^='#']");
    if (!links.length) return "";
    var items = Array.prototype.map.call(links, function (a) {
      return '<a class="s-toc-item" href="' + a.getAttribute("href") + '">' +
             a.textContent.trim() + "</a>";
    }).join("");
    return '<div class="s-toc">' + items + "</div>";
  }

  // Live keyword filter over the current page's cards (+ the sidebar TOC).
  function filter(term) {
    term = (term || "").trim().toLowerCase();
    var searching = !!term, shown = 0;
    Array.prototype.forEach.call(document.querySelectorAll("main .card"), function (c) {
      var hit = !searching || c.textContent.toLowerCase().indexOf(term) >= 0;
      c.style.display = hit ? "" : "none";
      if (c.id) {
        var t = document.querySelector('.s-toc-item[href="#' + c.id + '"]');
        if (t) t.style.display = hit ? "" : "none";
      }
      if (hit) shown++;
    });
    Array.prototype.forEach.call(document.querySelectorAll("main .themehead"), function (h) {
      h.style.display = searching ? "none" : "";
    });
    var main = document.querySelector("main");
    var note = document.getElementById("kwNote");
    if (searching && shown === 0 && main) {
      if (!note) { note = document.createElement("p"); note.id = "kwNote"; note.className = "s-noresult"; main.appendChild(note); }
      note.textContent = '“' + term + '” — 결과 없음'; note.style.display = "";
    } else if (note) { note.style.display = "none"; }
  }

  function mountSearch() {
    var side = document.querySelector(".sidebar");
    if (!side || document.getElementById("kwSearch")) return;
    var wrap = document.createElement("div");
    wrap.className = "s-search-wrap";
    wrap.innerHTML = '<input id="kwSearch" class="s-search" type="search" placeholder="이 페이지에서 검색…" autocomplete="off" spellcheck="false">';
    side.appendChild(wrap);
    var input = wrap.firstChild;
    input.addEventListener("input", function () { filter(input.value); });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.value = ""; filter(""); } });
  }

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

    // nest the active session's in-page TOC directly under it
    var activeEl = host.querySelector(".s-item.active");
    var sub = subTocMarkup();
    if (activeEl && sub) {
      activeEl.insertAdjacentHTML("afterend", sub);
      document.body.classList.add("has-sidetoc");   // CSS hides the in-main TOC on desktop
    }
    mountSearch();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  window.renderSessionSidebar = render;
})();
