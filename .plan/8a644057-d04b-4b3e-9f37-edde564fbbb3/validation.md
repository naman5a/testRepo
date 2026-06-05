# Validation

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
