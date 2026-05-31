import { describe, it } from 'node:test';
import { strictEqual, throws } from 'node:assert';
import { add, subtract, multiply, divide } from './calculator.js';

describe('add', () => {
  it('adds two positive numbers', () => {
    strictEqual(add(2, 3), 5);
  });

  it('adds negative numbers', () => {
    strictEqual(add(-1, -2), -3);
  });

  it('adds a positive and a negative number', () => {
    strictEqual(add(5, -3), 2);
  });

  it('adds zero', () => {
    strictEqual(add(7, 0), 7);
  });

  it('adds decimal numbers', () => {
    strictEqual(add(1.5, 2.3), 3.8);
  });
});

describe('subtract', () => {
  it('subtracts two positive numbers', () => {
    strictEqual(subtract(10, 4), 6);
  });

  it('returns a negative result', () => {
    strictEqual(subtract(3, 7), -4);
  });

  it('subtracts negative numbers', () => {
    strictEqual(subtract(-5, -3), -2);
  });

  it('subtracts zero', () => {
    strictEqual(subtract(9, 0), 9);
  });

  it('subtracts decimal numbers', () => {
    strictEqual(subtract(5.5, 2.5), 3);
  });
});

describe('multiply', () => {
  it('multiplies two positive numbers', () => {
    strictEqual(multiply(3, 5), 15);
  });

  it('multiplies by zero', () => {
    strictEqual(multiply(7, 0), 0);
  });

  it('multiplies negative numbers', () => {
    strictEqual(multiply(-3, -4), 12);
  });

  it('multiplies a positive and a negative number', () => {
    strictEqual(multiply(6, -2), -12);
  });

  it('multiplies decimal numbers', () => {
    strictEqual(multiply(2.5, 4), 10);
  });
});

describe('divide', () => {
  it('divides two positive numbers', () => {
    strictEqual(divide(10, 2), 5);
  });

  it('divides with a decimal result', () => {
    strictEqual(divide(7, 2), 3.5);
  });

  it('divides negative numbers', () => {
    strictEqual(divide(-10, -2), 5);
  });

  it('divides a positive by a negative number', () => {
    strictEqual(divide(9, -3), -3);
  });

  it('throws an error for division by zero', () => {
    throws(() => divide(10, 0), { message: 'Cannot divide by zero' });
  });

  it('throws an error for negative division by zero', () => {
    throws(() => divide(-10, 0), { message: 'Cannot divide by zero' });
  });
});
