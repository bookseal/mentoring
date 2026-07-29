/*
 * sessions.js — the multi-session sidebar (public, committed).
 *
 * One session = one page. To add a session: append an entry below
 * and create its page (copy 2026-07-24.html as an empty skeleton). Every page
 * that has an <aside> with <nav id="sessionNav"> and a <body data-session="...">
 * gets the sidebar filled + its own entry marked active.
 */
(function () {
  window.MENTORING_SESSIONS = [
    { id: "2026-07-17", date: "2026-07-17", title: "WTIA 첫 세션", summary: "네트워킹·로보틱스·비자·창업 — 미국 진출의 지형", href: "index.html", status: "done" },
    { id: "2026-07-24", date: "2026-07-24", title: "미국 진출·커리어 정리", summary: "문화·시장·Upstage·비자를 주제별로 정리", href: "2026-07-24.html", status: "done" },
    { id: "2026-07-31", date: "2026-07-31", title: "다음 질문", summary: "권력·AGI·Upstage 비자·로보틱스 — 앞으로 물어볼 것", href: "2026-07-31.html", status: "upcoming" },
  ];

  function render() {
    var host = document.getElementById("sessionNav");
    if (!host) return;
    var cur = (document.body && document.body.getAttribute("data-session")) || "";
    host.innerHTML = window.MENTORING_SESSIONS.map(function (s) {
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
    }).join("");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  window.renderSessionSidebar = render;
})();
