// Preview-only behaviour for the static staging snapshot.
(function () {
  var VIDEO = "https://danwoolf.co.za/__l5e/assets-v1/e49bec96-80a3-4806-b53d-48bbf18a7602/daniel-intro.mp4";
  // Scroll reveals (drives the icon choreography too)
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("reveal-in"); io.unobserve(e.target); } }); }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  var card = document.querySelector("#life-strategy input[type=range]");
  var chartCard = card && card.parentElement;
  if (chartCard) { var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { chartCard.classList.add("ls-in"); io2.disconnect(); } }); }, { threshold: 0.3 }); io2.observe(chartCard); }
  var pc = document.querySelector(".l333-line"); if (pc) { var box = pc.closest("div.relative"); var io3 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { box.classList.add("l333-in"); io3.disconnect(); } }); }, { threshold: 0.3 }); io3.observe(box); }
  // FAQ accordions
  document.querySelectorAll("button[aria-expanded]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      var panel = btn.parentElement.tagName === "H3" ? btn.parentElement.nextElementSibling : btn.nextElementSibling;
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) { panel.classList.toggle("grid-rows-[1fr]", !open); panel.classList.toggle("grid-rows-[0fr]", open); }
      var plus = btn.querySelector("span span"); if (plus) plus.classList.toggle("rotate-45", !open);
    });
  });
  // Age slider
  if (card) {
    var START = 30, END = 55, BASE = 2000, PEAK = 27000, X0 = 40, X1 = 400, Y0 = 190, Y1 = 30;
    var ageEl = chartCard.querySelector("p.text-5xl");
    var marker = chartCard.querySelector(".ls-marker");
    var mLine = marker && marker.querySelector("line"), mDot = marker && marker.querySelector("circle");
    var dds = chartCard.querySelectorAll("dd");
    var fmt = function (n) { return "R" + (Math.round(n / 50) * 50).toLocaleString("en-ZA"); };
    card.addEventListener("input", function () {
      var a = Number(card.value), esc = BASE * Math.pow(PEAK / BASE, (a - START) / (END - START));
      var x = X0 + ((a - START) / (END - START)) * (X1 - X0), y = Y0 - ((esc - BASE) / (PEAK - BASE)) * (Y0 - Y1);
      if (ageEl) ageEl.textContent = a;
      if (marker) marker.style.transform = "translate(" + x + "px, 0px)";
      if (mLine) mLine.setAttribute("y1", y); if (mDot) mDot.setAttribute("cy", y);
      if (dds[0]) dds[0].firstChild.textContent = fmt(esc);
      card.style.setProperty("--p", ((a - START) / (END - START)) * 100 + "%");
    });
  }
  // Intro video buttons become plain links to the clip (opens outside the preview)
  document.querySelectorAll("button").forEach(function (b) {
    var t = (b.textContent || "") + (b.getAttribute("aria-label") || "");
    if (!/intro/i.test(t)) return;
    var a = document.createElement("a"); a.href = VIDEO; a.target = "_blank"; a.rel = "noopener";
    a.className = b.className; if (b.getAttribute("aria-label")) a.setAttribute("aria-label", b.getAttribute("aria-label"));
    while (b.firstChild) a.appendChild(b.firstChild);
    b.replaceWith(a);
  });
  // Mobile menu drawer
  var menuBtn = document.querySelector('button[aria-label="Open menu"]');
  if (menuBtn) {
    var d = document.createElement("div"); d.className = "pv-drawer";
    d.innerHTML = '<div class="pv-bg"></div><div class="pv-panel"><button class="pv-close" aria-label="Close menu">×</button><a href="#approach">Approach</a><a href="#services">Services</a><a href="#life-strategy">333 Life Strategy</a><a href="#about">About</a><a href="#faq">FAQ</a><a href="333-life.html">333 Life page</a><a href="#book" class="btn-primary" style="justify-content:center;margin-top:8px">Book a consult</a></div>';
    document.body.appendChild(d);
    var close = function () { d.classList.remove("open"); };
    menuBtn.addEventListener("click", function () { d.classList.add("open"); });
    d.querySelector(".pv-bg").addEventListener("click", close); d.querySelector(".pv-close").addEventListener("click", close);
    d.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
  }
  // Sticky bar on the 333 page
  var bar = document.querySelector("div.fixed.inset-x-0.bottom-0"), hero = document.getElementById("top"), book = document.getElementById("book");
  if (bar && hero && book) {
    var hv = true, bv = false, upd = function () { var show = !hv && !bv; bar.setAttribute("aria-hidden", String(!show)); bar.classList.toggle("translate-y-0", show); bar.classList.toggle("translate-y-full", !show); bar.classList.toggle("pointer-events-none", !show); };
    new IntersectionObserver(function (es) { hv = es[0].isIntersecting; upd(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (es) { bv = es[0].isIntersecting; upd(); }, { threshold: 0.05 }).observe(book);
  }
  // Forms are disabled in the preview
  document.querySelectorAll("form").forEach(function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); var b = f.querySelector('button[type=submit]'); if (b) { b.textContent = "Preview only"; b.disabled = true; } });
  });
  var note = document.createElement("div"); note.className = "preview-note"; note.textContent = "PREVIEW · FORM DISABLED"; document.body.appendChild(note);
})();
