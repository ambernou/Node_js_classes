let colors = require('colors');

const [x, y] = process.argv.slice(2);

let a = +x;
let b = +y;
let arr = [];

// внесла небольшие поправки после замечаний от наставника

if (isNaN(a) || isNaN(b)) {
  console.log('Not a number!');
} else {
    for (let i = a; i <= b; i++) {
      let flag = 1;
      for (j = 2; j < i; j++) {
        if (i % j == 0) {
          flag = 0;
        }
      }
      if (flag == 1) {
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
}
