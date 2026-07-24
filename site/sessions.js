/*
 * sessions.js — the multi-session sidebar (public, committed).
 *
 * One mentoring session = one page. To add a session: append an entry below
 * and create its page (copy 2026-07-24.html as an empty skeleton). Every page
 * that has an <aside> with <nav id="sessionNav"> and a <body data-session="...">
 * gets the sidebar filled + its own entry marked active.
 */
(function () {
  window.MENTORING_SESSIONS = [
    { id: "2026-07-17", date: "2026-07-17", title: "WTIA 멘토링", href: "index.html", status: "done" },
    { id: "2026-07-24", date: "2026-07-24", title: "멘토링", href: "2026-07-24.html", status: "empty" },
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
        (s.status === "empty" ? '<span class="s-badge">비어있음</span>' : "") +
        "</a>"
      );
    }).join("");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
  window.renderSessionSidebar = render;
})();
