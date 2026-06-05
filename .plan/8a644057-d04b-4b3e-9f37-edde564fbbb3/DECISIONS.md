# Locked Decisions for Story 8a644057-d04b-4b3e-9f37-edde564fbbb3

## Implementation Approach
## Implementation Approach

**Action:** Rewrite `calculator.js` from scratch as a faithful 1:1 CommonJS port of `calculator.py`. Update `calculator.test.js` to match.

### calculator.js — Structure

The file will mirror the Python source exactly:

1. **Four arithmetic functions** at the top — `add`, `subtract`, `multiply`, `divide` — each taking two parameters and returning the result. `divide` has **no division-by-zero guard** (matches Python source exactly).

2. **Menu display** — Five `console.log()` calls printing the menu, matching the Python `print()` calls:
   ```
   Select options.
   1. Add
   2. Subtract
   3. Multiply
   4. Divide
   ```

3. **Main loop** — An async `while (true)` loop using Node.js `readline` to prompt the user:
   - Valid choice (`1`/`2`/`3`/`4`): prompt for two numbers via `parseFloat()`, call the corresponding function, print the result.
   - `'n'`: print `'Your are successfully logged out!'` (exact text from Python source, including the typo), close readline, break.
   - Anything else: print `'Please enter correct input among these 1/2/3/4/n'`, re-prompt.

4. **Result output** — Use `console.log(a, symbol, b, '=', result)` to replicate Python's `print()` space-separated output. **JavaScript's native number formatting** is used (e.g., `5` not `5.0`) — this minor cosmetic difference from Python is accepted.

5. **readline helper** — A small `askQuestion(rl, question)` function wrapping `rl.question()` in a Promise, since `readline` is callback-based and the loop is `async/await`.

### Module System & Exports

- **CommonJS** — `require`/`module.exports` as specified in the Technology Stack decision.
- **Exports** — `module.exports = { add, subtract, multiply, divide }` at the bottom, enabling test imports.
- **Main guard** — The menu display and interactive loop are wrapped in a `main()` function, executed only when `require.main === module`. This prevents the CLI loop from running when the test file `require()`s the module.

### package.json

- The existing `package.json` has `"type": "module"` (ESM). This **must be removed or changed** since we're switching to CommonJS. Either delete the `"type"` field or remove `package.json` entirely (CommonJS is Node.js's default without it).

### calculator.test.js — Updates

- **Switch from ESM to CommonJS** — Replace `import { ... } from './calculator.js'` with `const { add, subtract, multiply, divide } = require('./calculator.js')`.
- **Remove divide-by-zero tests** — The two `throws(() => divide(x, 0), ...)` test cases are removed since the Python source has no such guard.
- **Keep all other tests** — The existing `add`, `subtract`, `multiply`, and `divide` tests (positive, negative, decimal, zero cases) remain unchanged in logic, only syntax changes for CommonJS.
- **Test runner** — `node:test` with `node:assert` (unchanged, as per Testing Strategy).

### No additional features

- No `formatNumber` helper.
- No `operations` map or `calculate` function.
- No NaN input validation.
- Straight `if/else if` chain matching the Python `if/elif` structure.

## Validation
## Validation & Error Handling

**Principle:** Match the Python source exactly — no additional validation beyond what it does.

### Menu choice validation (covered by this story)

| Input | Behavior |
|-------|----------|
| `'1'`, `'2'`, `'3'`, `'4'` | Valid — proceed to number input prompts |
| `'n'` | Exit — print `'Your are successfully logged out!'` and break |
| Anything else | Print `'Please enter correct input among these 1/2/3/4/n'` and re-prompt |

This is a simple string equality check, matching the Python `if choice in ('1','2','3','4')` / `elif choice == 'n'` / `else` structure.

### Number input — NO validation

The Python source calls `float(input(...))` with **no try/except**. If the user enters non-numeric text, Python raises a `ValueError` and crashes. The JavaScript port will mirror this: `parseFloat()` is called on the input, and if the result is `NaN`, the arithmetic proceeds (producing `NaN` results) — no guard, no error message.

This is intentional: the locked Migration Strategy specifies "no functional enhancements" and "no improved error handling beyond what's needed for the language switch."

### Division by zero — NO guard

The Python source has no division-by-zero handling. `divide(a, 0)` in Python raises `ZeroDivisionError` and crashes. In JavaScript, `a / 0` returns `Infinity` (or `-Infinity` or `NaN`), which is a language-level difference — but we will **not** add an explicit throw or guard. The function simply returns `first_number / second_number`.

### Edge cases accepted as-is

- **Whitespace in choice input** — If user types `' 1'` or `'1 '`, it won't match `'1'` and will trigger the invalid choice message. Same behavior as Python.
- **Empty input** — Triggers invalid choice message. Same as Python.
- **Case sensitivity on exit** — Only lowercase `'n'` exits. `'N'` triggers invalid choice. Same as Python.
