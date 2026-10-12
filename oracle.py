import json, math

def jsnum(x):
    return int(x) if isinstance(x, float) and x == int(x) else x
def plural(n, word, form=None): return str(jsnum(n)) + " " + (word if n == 1 else (form or word + "s"))
def fmt(x): return str(jsnum(x))
def round1(x): return jsnum(math.floor(x * 10 + 0.5) / 10)

def gate_plan(openingCm):
    if not (openingCm > 0): return {"error": "opening must be positive"}
    panel = openingCm - 4
    if not (panel > 0): return {"error": "opening is narrower than the labeled gaps"}
    if panel <= 90: panels, verdict = 1, "a standard single panel on the labeled span"
    elif panel <= 120: panels, verdict = 1, "a wide single on the labeled span"
    else: panels, verdict = 2, "split into two panels on the labeled span"
    return {"panel": panel, "panels": panels, "each": round1(panel / panels), "verdict": verdict}

def hinge_plan(weightKg):
    if not (weightKg > 0): return {"error": "weight must be positive"}
    hinges = max(2, math.ceil(weightKg / 20))
    return {"hinges": hinges, "screws": hinges * 6}

def render_gate(r, openingCm):
    return ("Opening " + fmt(openingCm) + " cm wide loses a labeled 4 cm to hinge and latch gaps: a " + fmt(r["panel"])
            + " cm clear span, " + plural(r["panels"], "panel") + " at " + fmt(r["each"]) + " cm each - "
            + r["verdict"] + ".")

def render_hinge(r, weightKg):
    return ("A " + fmt(weightKg) + " kg gate works out to " + plural(r["hinges"], "hinge")
            + " at a labeled 20 kg each, " + plural(r["screws"], "screw")
            + " at 6 a hinge - illustrative arithmetic only; the manufacturer rates the real hardware.")

cases = []
for a in [(94,), (124,), (150,), (4,), (0,)]:
    r = gate_plan(*a)
    cases.append({"fn": "gatePlan", "args": list(a), "result": r,
                  "render": None if "error" in r else render_gate(r, *a)})
for a in [(15,), (35,), (55,), (0,)]:
    r = hinge_plan(*a)
    cases.append({"fn": "hingePlan", "args": list(a), "result": r,
                  "render": None if "error" in r else render_hinge(r, *a)})

with open("expected.json", "w") as f:
    f.write(json.dumps(cases, separators=(",", ":")) + "\n")
print("wrote", len(cases), "cases")
