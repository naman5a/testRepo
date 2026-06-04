

# AGENTS.md

## Tech Stack
- Runtime: Node.js 20 LTS
- Language: Vanilla JavaScript (no TypeScript)
- Module system: CommonJS (`require`/`module.exports`)
- Console input: Built-in `readline` module
- No external dependencies — zero npm packages
- No build step, no transpilation, no bundling
- `package.json` is optional (no dependencies to manage)
- Do NOT use ES modules (`import`/`export`)
- Do NOT use TypeScript
- Do NOT add any third-party libraries (e.g., `prompt-sync`, `inquirer`)

## Architecture
- Single-file application: all code lives in `calculator.js`
- Procedural style — no classes, no dependency injection, no frameworks
- Four arithmetic functions defined at top level: `add`, `subtract`, `multiply`, `divide`
- Main interactive loop in the same file
- Entry point: `node calculator.js`
- Do NOT split into multiple files or modules
- Do NOT introduce design patterns beyond simple functions

## Migration Rules
- 1:1 faithful port of the Python calculator — same user interaction flow
- Flow: menu display → operation choice → two number inputs → result display → loop until 'n' to exit
- Console prompts, menu text, and result formatting must match the Python version as closely as possible
- Python `input()` → Node.js `readline` equivalent
- Do NOT add new features, improved error handling, or structural changes beyond what the language switch requires
- Do NOT build a web UI — this is a CLI application

## Testability
- Export arithmetic functions via `module.exports` for test access
- Guard the main interactive loop behind `require.main === module` so it only runs when executed directly
- This is the only structural addition beyond a pure 1:1 port

## Testing
- Test runner: Node.js built-in `node:test` module
- Assertions: `node:assert`
- Test file: `calculator.test.js`
- Run tests: `node --test`
- Test all four functions: `add`, `subtract`, `multiply`, `divide`
- Do NOT test the interactive CLI loop — verify that manually
- Do NOT use external test frameworks (no Jest, Mocha, Vitest, etc.)

## Non-Functional
- Must produce identical arithmetic results and console output as the Python original for the same inputs
- Must run on Node.js 20 LTS without errors
- No performance, cross-platform, accessibility, i18n, or compliance requirements