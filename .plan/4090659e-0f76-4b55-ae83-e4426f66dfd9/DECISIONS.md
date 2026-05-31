# Locked Decisions for Story 4090659e-0f76-4b55-ae83-e4426f66dfd9

## Implementation Approach
## Implementation Approach: Update Exit Message in Existing CLI Loop

### Change
A single-line change in `calculator.js` — replace the exit confirmation message from the Python-inherited `"Your are successfully logged out!"` to `"Thank you for using the calculator. Goodbye!"`.

### Location
In `calculator.js`, inside the `main()` function's `while (true)` loop, within the `else if (choice === 'n')` branch (currently line ~68):

```js
// Before
console.log('Your are successfully logged out!');

// After
console.log('Thank you for using the calculator. Goodbye!');
```

### Behavior
- **Trigger**: User enters `'n'` at the operation choice prompt
- **Action**: Print the updated confirmation message, close the `readline` interface, and break out of the loop — terminating the program
- **No other changes**: The exit trigger (`'n'`), `rl.close()`, and `break` remain unchanged

### Deviation from Python Source
This is an **intentional deviation** from strict 1:1 behavioral parity (locked NFR). The original Python message contains a typo ("Your" → should be "You're") and uses "logged out" which is semantically incorrect for a calculator. This improvement was explicitly requested.

### Testing
Per the locked Testing Strategy, exit handling is verified manually, not via automated tests. No test changes are needed.
