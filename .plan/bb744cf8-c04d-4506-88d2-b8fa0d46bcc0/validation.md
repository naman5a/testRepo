# Validation

## Validation: Exact Parity with Python Input Handling

### Valid Inputs
| Input | Action |
|-------|--------|
| `'1'` | Proceed to addition |
| `'2'` | Proceed to subtraction |
| `'3'` | Proceed to multiplication |
| `'4'` | Proceed to division |
| `'n'` | Exit the calculator |

Any other input falls through to the error case.

### Error Message
Exact string from the Python source:
```
Please enter correct input among these 1/2/3/4/n
```

### Behavior After Invalid Input
- The error message is printed via `console.log()`.
- The `while (true)` loop continues, re-displaying the prompt: `Enter choice(1/2/3/4 or n to cancel): `.
- The calculator never terminates due to invalid input — only `'n'` breaks the loop.

### Edge Cases — No Special Handling (Parity)
| Scenario | Behavior |
|----------|----------|
| Empty input (just pressing Enter) | Treated as invalid — error message shown |
| Whitespace (e.g., `' 1'`, `'1 '`) | Treated as invalid — no trimming, exact match only |
| Uppercase `'N'` | Treated as invalid — case-sensitive comparison |
| Numbers outside 1-4 (e.g., `'5'`, `'0'`) | Treated as invalid — error message shown |
| Special characters, symbols | Treated as invalid — error message shown |

### Rationale
All edge case behavior matches the Python original exactly. Python's `input()` returns the raw string, and the `if choice in ('1', '2', '3', '4')` check is a strict equality against those four strings. The JavaScript version replicates this with `['1', '2', '3', '4'].includes(choice)` and `choice === 'n'`.
