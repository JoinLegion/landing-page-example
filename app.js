/* Teaching mockup only. PostHog is optional; tracking no-ops without it. */
(function () {
  var params = new URLSearchParams(location.search);
  var data = {
    firstName: params.get("first") || params.get("first_name") || "Jordan",
    company: params.get("company") || "Northline Manufacturing",
    asset: params.get("asset") || "ops benchmark",
    lookalike: params.get("lookalike") || "Northline Ops",
    outcome: params.get("outcome") || "cut booked meetings from 11 days to 3",
    slug: params.get("p") || "northline-jordan",
    emailHash: params.get("eh") || ""
  };

  function fill(id, value) {
    document.querySelectorAll('[data-bind="' + id + '"]').forEach(function (el) {
      el.textContent = value;
    });
  }

  fill("firstName", data.firstName);
  fill("company", data.company);
  fill("asset", data.asset);
  fill("lookalike", data.lookalike);
  fill("outcome", data.outcome);
  fill("personalHeader", "Built for " + data.company + ", " + data.firstName + ".");
  fill("scrollPrompt", "Hey " + data.firstName + ", scroll down to get your free " + data.asset + ".");
  fill("walkthroughLine", "Want a walkthrough of how " + data.lookalike + " " + data.outcome + ", mapped onto " + data.company + "? Grab 15 min.");
  fill("stickyBanner", "See how a shop like " + data.lookalike + " " + data.outcome + ". Walkthrough for " + data.company + ".");
  fill("exitHeading", "See how a shop like " + data.lookalike + " " + data.outcome + ". Walkthrough for " + data.company + ".");
  fill("exitLead", "You already have the benchmark. This 15-minute walkthrough shows the case-study outcome for a shop like yours, then maps the same 3 steps onto " + data.company + ". Nothing else to submit.");
  fill("closerLine", "See how a shop like " + data.lookalike + " " + data.outcome + ", then map the same 3 steps onto your floor. Keep the benchmark either way.");
  fill("assetTitle", data.company + " " + data.asset);

  var title = document.querySelector("title");
  if (title && document.body.dataset.page === "lp") {
    title.textContent = data.company + ": " + data.asset + " (teaching mockup)";
  }

  var P = data.slug;
  function track(event, props) {
    var payload = Object.assign({ prospect: P, email_hash: data.emailHash || undefined }, props || {});
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(event, payload);
    }
  }
  window.RivetTrack = track;

  if (params.get("teardown") === "1") document.body.classList.add("teardown");
  if (params.get("teardown") === "0") document.body.classList.remove("teardown");

  var toggle = document.getElementById("teardown-toggle");
  function syncToggle() {
    if (!toggle) return;
    toggle.textContent = document.body.classList.contains("teardown")
      ? "Hide the teardown"
      : "Show the teardown";
  }
  syncToggle();
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("teardown");
      syncToggle();
    });
  }

  document.querySelectorAll("[data-vsl]").forEach(function (el) {
    function playStub() {
      if (el.classList.contains("is-playing")) return;
      el.classList.add("is-playing");
      var time = el.querySelector(".vsl-time");
      var titleEl = el.querySelector(".vsl-title");
      if (time) time.textContent = "PLAYING";
      if (titleEl) titleEl.textContent = "Demo stub. No video file is attached yet.";
      track("vsl_played", { kind: el.dataset.vsl || "main" });
    }
    el.addEventListener("click", playStub);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playStub(); }
    });
  });

  document.querySelectorAll("[data-cta]").forEach(function (a) {
    a.addEventListener("click", function () {
      track("booking_clicked", { placement: a.dataset.cta });
    });
  });

  var download = document.getElementById("download-asset");
  if (download) {
    download.addEventListener("click", function (e) {
      e.preventDefault();
      track("asset_download_clicked");
      var note = document.getElementById("download-note");
      if (note) note.hidden = false;
    });
  }

  if (document.body.dataset.page === "thanks") {
    track("booking_completed");
    return;
  }

  track("pageview", { utm_source: params.get("utm_source") || "", campaign: params.get("utm_campaign") || "" });

  var marks = [25, 50, 75, 100];
  addEventListener("scroll", function () {
    var pct = Math.round((scrollY + innerHeight) / document.body.scrollHeight * 100);
    while (marks.length && pct >= marks[0]) track("scroll_depth", { pct: marks.shift() });
  }, { passive: true });

  var KEY = "exit_seen_" + P;
  var shown = false;
  var overlay = document.getElementById("exit");
  if (!overlay) return;

  function openExit(how) {
    if (shown || localStorage.getItem(KEY)) return;
    shown = true;
    localStorage.setItem(KEY, "1");
    overlay.classList.add("on");
    track("exit_popup_shown", { trigger: how });
  }
  function closeExit() {
    overlay.classList.remove("on");
    track("exit_popup_closed");
  }
  window.closeExit = closeExit;

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeExit();
  });
  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && e.clientY < 10) openExit("mouse_leave");
  });
  var lastY = scrollY, lastT = Date.now();
  addEventListener("scroll", function () {
    var dy = lastY - scrollY;
    var dt = Date.now() - lastT;
    if (scrollY > 600 && dy > 120 && dt < 250) openExit("fast_scroll_up");
    lastY = scrollY;
    lastT = Date.now();
  }, { passive: true });
  history.pushState({ lp: 1 }, "");
  addEventListener("popstate", function () {
    if (!shown) {
      openExit("back_button");
      history.pushState({ lp: 1 }, "");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeExit();
  });
  if (location.hash === "#exit") {
    localStorage.removeItem(KEY);
    shown = false;
    openExit("preview");
  }

  var sideItems = [
    {
      stat: "11 days to 3",
      body: "Northline Ops booked meetings the same week after one owner per yes.",
      who: "Northline Ops · illustrative case study",
      kind: "case_study"
    },
    {
      stat: "We needed a cleaner handoff.",
      body: "VP of Operations at a mid-market fabricator, after the walkthrough.",
      who: "Illustrative review",
      kind: "review"
    },
    {
      stat: "19 days to 6",
      body: "Halden Fabrication booked from the asset page instead of opening a new thread.",
      who: "Halden Fabrication · illustrative case study",
      kind: "case_study"
    },
    {
      stat: "2.1x meetings",
      body: "Rivermark Components kept the same list and headcount, and cut lag after a yes.",
      who: "Rivermark Components · illustrative case study",
      kind: "case_study"
    },
    {
      stat: "The 15 minutes showed the skip.",
      body: "Director of Revenue Ops, components maker, on seeing which of the 3 steps they skipped.",
      who: "Illustrative review",
      kind: "review"
    }
  ];

  var side = document.getElementById("side-pop");
  var sideDismiss = document.getElementById("side-pop-dismiss");
  var SIDE_KEY = "side_pop_dismissed_" + P;
  var sideIndex = 0;
  var sideTimer = null;
  var sideHideTimer = null;
  var sidePaused = false;

  function renderSide(item) {
    if (!side) return;
    var stat = document.getElementById("side-pop-stat");
    var body = document.getElementById("side-pop-body");
    var who = document.getElementById("side-pop-who");
    if (stat) stat.textContent = item.stat;
    if (body) body.textContent = item.body;
    if (who) who.textContent = item.who;
  }

  function hideSide() {
    if (!side) return;
    side.classList.remove("on");
    window.clearTimeout(sideHideTimer);
    sideHideTimer = window.setTimeout(function () {
      if (!side.classList.contains("on")) side.hidden = true;
    }, 360);
  }

  function showSide() {
    if (!side || sidePaused || localStorage.getItem(SIDE_KEY)) return;
    if (document.getElementById("exit") && document.getElementById("exit").classList.contains("on")) return;
    var item = sideItems[sideIndex % sideItems.length];
    sideIndex += 1;
    renderSide(item);
    side.hidden = false;
    // force reflow so transition runs
    void side.offsetWidth;
    side.classList.add("on");
    track("side_popup_shown", { kind: item.kind, index: sideIndex });
    window.clearTimeout(sideHideTimer);
    sideHideTimer = window.setTimeout(hideSide, 6500);
  }

  function scheduleSide() {
    window.clearTimeout(sideTimer);
    if (sidePaused || localStorage.getItem(SIDE_KEY)) return;
    sideTimer = window.setTimeout(function tick() {
      showSide();
      sideTimer = window.setTimeout(tick, 11000);
    }, 4500);
  }

  if (sideDismiss) {
    sideDismiss.addEventListener("click", function () {
      sidePaused = true;
      localStorage.setItem(SIDE_KEY, "1");
      hideSide();
      track("side_popup_dismissed");
      window.clearTimeout(sideTimer);
    });
  }

  if (location.hash === "#side") {
    localStorage.removeItem(SIDE_KEY);
    sidePaused = false;
    sideIndex = 0;
    window.setTimeout(showSide, 300);
  } else {
    scheduleSide();
  }

  var originalOpenExit = openExit;
  openExit = function (how) {
    hideSide();
    originalOpenExit(how);
  };
  window.openExit = openExit;

})();
