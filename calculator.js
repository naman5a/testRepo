// Program make a basic calculator
// Author @inforkgodara

import { createInterface } from 'node:readline';

// Function adds two numbers
export function add(first_number, second_number) {
  return first_number + second_number;
}

// Function subtracts two numbers
export function subtract(first_number, second_number) {
  return first_number - second_number;
}

// Function multiplies two numbers
export function multiply(first_number, second_number) {
  return first_number * second_number;
}

// Function divides two numbers
export function divide(first_number, second_number) {
  if (second_number === 0) throw new Error('Cannot divide by zero');
  return first_number / second_number;
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function formatNumber(n) {
  return Number.isInteger(n) ? n.toFixed(1) : String(n);
}

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log('Select options.');
  console.log('1. Add');
  console.log('2. Subtract');
  console.log('3. Multiply');
  console.log('4. Divide');

  while (true) {
    // Take input from the console
    const choice = await askQuestion(rl, 'Enter choice(1/2/3/4 or n to cancel): ');
    // Check if choice is one of the five options
    if (['1', '2', '3', '4'].includes(choice)) {
      const first_number = parseFloat(await askQuestion(rl, 'Enter first number: '));
      const second_number = parseFloat(await askQuestion(rl, 'Enter second number: '));

      if (choice === '1') {
        console.log(formatNumber(first_number), '+', formatNumber(second_number), '=', formatNumber(add(first_number, second_number)));
      } else if (choice === '2') {
        console.log(formatNumber(first_number), '-', formatNumber(second_number), '=', formatNumber(subtract(first_number, second_number)));
      } else if (choice === '3') {
        console.log(formatNumber(first_number), '*', formatNumber(second_number), '=', formatNumber(multiply(first_number, second_number)));
      } else if (choice === '4') {
        console.log(formatNumber(first_number), '/', formatNumber(second_number), '=', formatNumber(divide(first_number, second_number)));
      }
    } else if (choice === 'n') {
      console.log('Thank you for using the calculator. Goodbye!');
      rl.close();
      break;
    } else {
      console.log('Please enter correct input among these 1/2/3/4/n');
    }
  }
}

// Only run the CLI loop when executed directly, not when imported by tests
import { resolve } from 'node:path';
const isMainModule = process.argv[1] && import.meta.url === 'file://' + resolve(process.argv[1]);
if (isMainModule) {
  main();
}
