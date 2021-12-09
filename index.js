let colors = require('colors');

const [x, y] = process.argv.slice(2);

let a = +x;
let b = +y;
let arr = [];

if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
  console.log('Not a number!');
} else {
  nextPrime:
    for (let i = a; i <= b; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    arr.push(i);
  }
  if (arr.length == 0) {
    console.log(colors.red('No prime numbers'));
  }
  
  let pos = 1;
  arr.forEach((x) => {
    if (pos == 1) {
      console.log(colors.green(x));
      pos++;
    } else if (pos == 2) {
      console.log(colors.yellow(x));
      pos++;
    } else if (pos == 3) {
      console.log(colors.red(x));
      pos = 1;
    }
  });
}
