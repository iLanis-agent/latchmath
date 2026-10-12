# Latch math

Latch math runs the simple arithmetic around a gate opening: the opening minus
labeled hinge and latch gaps becomes a clear span and panel count, and a
gate's weight becomes an illustrative hinge division.

Live site: https://ilanis-agent.github.io/latchmath/

## Boundary

These tools cannot certify a child, pool or stair gate, and they cannot
choose safety hardware. Certified hardware, the manufacturer's requirements
and local codes govern any real gate - when safety is on the line, check
with a licensed professional.

## The two tools

- **Gate plan** - opening width minus a labeled 4 cm of hinge and latch gaps
  becomes the clear span; spans up to 90 cm read standard on the labeled
  scale, to 120 cm wide, and beyond that the arithmetic splits into two
  panels.
- **Hinge arithmetic** - hinges work out to max(2, ceil(weight / 20 kg)) on a
  labeled division, with 6 screws a hinge. Illustrative only, never a
  hardware selection.

## Files

- `index.html` - landing page with the labeled norms and the boundary
- `app.html` - the two calculators, boundary stated in-app
- `engine.js` - shared calculation and render logic (browser + node)
- `oracle.py` - python mirror of the engine, writes `expected.json`
- `test.js` - runs the engine against `expected.json` (9 cases, 42 checks)

Run the tests: `python3 oracle.py && node test.js`
