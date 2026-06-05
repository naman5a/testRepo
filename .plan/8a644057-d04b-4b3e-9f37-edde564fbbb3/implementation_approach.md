# Implementation Approach

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
