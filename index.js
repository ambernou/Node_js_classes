let colors = require('colors');

let a = 8;
let b = '10';
let arr = [];

if (typeof a !== "number" || typeof b !== "number") {
  console.log('Not a number!');
} else {
  nextPrime:
    for (let i = a; i <= b; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    arr.push(i);
  }
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

// for (i = 0; i < arr.length; i = i + 3) {
//   console.log(arr[i], '-1-');
//   if (i != arr.length) {
//   console.log(arr[i + 1], '-2-');
//   console.log(arr[i + 2], '-3-');
//   } else break;
// }
