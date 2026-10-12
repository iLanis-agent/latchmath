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
    else if (panel <= 120) { panels = 1; verdict = "a wide single - check the hinge rating on the labeled span"; }
    else { panels = 2; verdict = "split into two panels on the labeled span"; }
    var each = round1(panel / panels);
    return { panel: panel, panels: panels, each: each, verdict: verdict };
  }

  function latchPlan(childHeightCm, latchHeightCm) {
    if (!(childHeightCm > 0) || !(latchHeightCm > 0)) return { error: "child height and latch height must be positive" };
    var reach = round1(childHeightCm * 4 / 3);
    var margin = round1(latchHeightCm - reach);
    var verdict;
    if (margin < 0) verdict = "within reach on the labeled rule - mount it higher";
    else if (margin < 20) verdict = "a thin margin on the labeled rule";
    else verdict = "out of reach on the labeled rule";
    return { reach: reach, margin: margin, verdict: verdict };
  }

  function hingePlan(weightKg) {
    if (!(weightKg > 0)) return { error: "weight must be positive" };
    var hinges = Math.max(2, Math.ceil(weightKg / 20));
    var screws = hinges * 6;
    var verdict;
    if (weightKg <= 20) verdict = "light duty on the labeled scale";
    else if (weightKg <= 40) verdict = "standard duty on the labeled scale";
    else verdict = "heavy duty on the labeled scale";
    return { hinges: hinges, screws: screws, verdict: verdict };
  }

  function renderGate(r, openingCm) {
    return "Opening " + openingCm + " cm wide loses a labeled 4 cm to hinge and latch gaps: a " + r.panel + " cm clear span, " + plural(r.panels, "panel") + " at " + r.each + " cm each - " + r.verdict + ".";
  }

  function renderLatch(r, childHeightCm, latchHeightCm) {
    return "A child " + childHeightCm + " cm tall reaches a labeled " + r.reach + " cm; a latch at " + latchHeightCm + " cm leaves " + plural(r.margin, "centimeter", "centimeters") + " of margin - " + r.verdict + ".";
  }

  function renderHinge(r, weightKg) {
    return "A " + weightKg + " kg gate hangs on " + plural(r.hinges, "hinge") + " at a labeled 20 kg each, " + plural(r.screws, "screw") + " at 6 a hinge - " + r.verdict + ".";
  }

  var api = { gatePlan: gatePlan, latchPlan: latchPlan, hingePlan: hingePlan, renderGate: renderGate, renderLatch: renderLatch, renderHinge: renderHinge };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.LatchMath = api;
})(this);
