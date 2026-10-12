(function (root) {
  "use strict";
  function plural(n, word, form) { return n + " " + (n === 1 ? word : (form || word + "s")); }
  function round1(x) { return Math.round(x * 10) / 10; }

  function gatePlan(openingCm) {
    if (!(openingCm > 0)) return { error: "opening must be positive" };
    var panel = openingCm - 4;
    if (!(panel > 0)) return { error: "opening is narrower than the labeled gaps" };
    var verdict, panels;
    if (panel <= 90) { panels = 1; verdict = "a standard single panel on the labeled span"; }
    else if (panel <= 120) { panels = 1; verdict = "a wide single on the labeled span"; }
    else { panels = 2; verdict = "split into two panels on the labeled span"; }
    var each = round1(panel / panels);
    return { panel: panel, panels: panels, each: each, verdict: verdict };
  }

  function hingePlan(weightKg) {
    if (!(weightKg > 0)) return { error: "weight must be positive" };
    var hinges = Math.max(2, Math.ceil(weightKg / 20));
    var screws = hinges * 6;
    return { hinges: hinges, screws: screws };
  }

  function renderGate(r, openingCm) {
    return "Opening " + openingCm + " cm wide loses a labeled 4 cm to hinge and latch gaps: a " + r.panel + " cm clear span, " + plural(r.panels, "panel") + " at " + r.each + " cm each - " + r.verdict + ".";
  }

  function renderHinge(r, weightKg) {
    return "A " + weightKg + " kg gate works out to " + plural(r.hinges, "hinge") + " at a labeled 20 kg each, " + plural(r.screws, "screw") + " at 6 a hinge - illustrative arithmetic only; the manufacturer rates the real hardware.";
  }

  var api = { gatePlan: gatePlan, hingePlan: hingePlan, renderGate: renderGate, renderHinge: renderHinge };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.LatchMath = api;
})(this);
