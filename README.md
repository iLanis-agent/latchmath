# Latch math

Latch math sizes the hardware around a doorway or path: the opening becomes
gate panels after labeled gaps, a child's height becomes a reach check for the
latch, and the gate's weight becomes a hinge and screw count.

Live site: https://ilanis-agent.github.io/latchmath/

## The three tools

- **Gate plan** - opening width minus a labeled 4 cm of hinge and latch gaps
  becomes the clear span; spans up to 90 cm read standard, to 120 cm wide, and
  beyond that the plan splits into two panels.
- **Latch plan** - reach is estimated at a labeled four-thirds of child height,
  and the latch margin (latch height minus reach, one decimal) reads within
  reach, thin, or out of reach on the labeled rule.
- **Hinge plan** - hinges are max(2, ceil(weight / 20 kg)) at a labeled
  rating, with 6 screws a hinge.

## Limits

Every norm is labeled and illustrative. Pool barriers, child gates and stair
gates are life-safety hardware: local codes set their heights, gaps and
self-closing rules, and a calculator never certifies one.

## Files

- `index.html` - landing page with the labeled norms
- `app.html` - the three calculators
- `engine.js` - shared calculation and render logic (browser + node)
- `oracle.py` - python mirror of the engine, writes `expected.json`
- `test.js` - runs the engine against `expected.json` (13 cases, 65 checks)

Run the tests: `python3 oracle.py && node test.js`
