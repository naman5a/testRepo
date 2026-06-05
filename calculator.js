// Program make a basic calculator
// Author @inforkgodara

const readline = require('node:readline');

// Function adds two numbers
function add(first_number, second_number) {
  return first_number + second_number;
}

// Function subtracts two numbers
function subtract(first_number, second_number) {
  return first_number - second_number;
}

// Function multiplies two numbers
function multiply(first_number, second_number) {
  return first_number * second_number;
}

// Function divides two numbers
function divide(first_number, second_number) {
  return first_number / second_number;
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log('Select options.');
  console.log('1. Add');
  console.log('2. Subtract');
  console.log('3. Multiply');
  console.log('4. Divide');

  while (true) {
    // Take input from the console
    const choice = await askQuestion(rl, 'Enter choice(1/2/3/4 or n to cancel): ');
    // Check if choice is one of the five options
    if (choice === '1' || choice === '2' || choice === '3' || choice === '4') {
      const first_number = parseFloat(await askQuestion(rl, 'Enter first number: '));
      const second_number = parseFloat(await askQuestion(rl, 'Enter second number: '));

      if (choice === '1') {
        console.log(first_number, '+', second_number, '=', add(first_number, second_number));
      } else if (choice === '2') {
        console.log(first_number, '-', second_number, '=', subtract(first_number, second_number));
      } else if (choice === '3') {
        console.log(first_number, '*', second_number, '=', multiply(first_number, second_number));
      } else if (choice === '4') {
        console.log(first_number, '/', second_number, '=', divide(first_number, second_number));
      }
    } else if (choice === 'n') {
      console.log('Your are successfully logged out!');
      rl.close();
      break;
    } else {
      console.log('Please enter correct input among these 1/2/3/4/n');
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide };
