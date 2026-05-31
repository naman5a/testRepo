

# AGENTS.md

## Tech Stack
- Runtime: Node.js 22 LTS
- Language: Plain JavaScript (ES modules) — do NOT use TypeScript
- Zero external dependencies — use only Node.js built-in modules
- Console I/O: `node:readline`
- Testing: `node:test` and `node:assert` (built-in)
- `package.json` must set `"type": "module"` and contain only name, version, and entry point
- Do NOT add any `node_modules`, `package-lock.json`, bundlers, transpilers, or compilers

## Architecture
- Single-file application: all code lives in `calculator.js`
- Do NOT split into multiple modules or introduce layers
- Define arithmetic functions (`add`, `subtract`, `multiply`, `divide`) as standalone exported functions at the top of the file
- CLI input loop lives in the same file below the arithmetic functions
- Entry point: `node calculator.js`
- No build step required

## Behavioral Requirements
- Strict 1:1 behavioral parity with the original Python calculator
- Output and input must be identical to the Python version
- Do NOT add error handling, guards, or features beyond what the Python original has
- Division by zero handling must match the Python behavior exactly
- Do NOT enhance or "improve" the original behavior

## CLI Structure
- Menu-driven interactive prompt using `node:readline`
- Input validation with clear feedback on invalid menu choices
- Graceful exit via cancel command
- Cross-platform — do NOT use OS-specific code

## Testing
- Single test file: `calculator.test.js` alongside `calculator.js`
- Unit tests only — cover `add`, `subtract`, `multiply`, `divide`
- Export arithmetic functions from `calculator.js` so tests can import them
- Run tests via: `node --test`
- Do NOT test the CLI loop, input validation, or exit handling in automated tests
- Do NOT add test configuration files or dev dependencies
- Do NOT use any external test framework (Jest, Mocha, etc.)

## Code Style
- Write readable, idiomatic JavaScript following standard JS conventions
- Use `import`/`export` (ES module syntax) — do NOT use `require`/`module.exports`
- No linting or formatting tools — keep style consistent manually