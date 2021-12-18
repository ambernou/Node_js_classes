const fs = require('fs');
const readline = require('readline');
const ACCESS_LOG_TEST = './access_test.log';
const ACCESS_LOG = './access.log';
const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';

const readStream = fs.createReadStream(ACCESS_LOG, {
    flag: 'r',
    encoding: 'utf-8',
    highWaterMark: 1024,
});

const writeStream1 = fs.createWriteStream(`${ip1}_requests.log`, {
    encoding: 'utf-8',
    flags: 'a',
});

const writeStream2 = fs.createWriteStream(`${ip2}_requests.log`, {
    encoding: 'utf-8',
    flags: 'a',
});

const rl = readline.createInterface({
    input: readStream,
    // output:
});

rl.on('line', (input) => {
    // console.log(`${input}`);
    if (input.includes(ip1)) {
        writeStream1.write(`${input}\n`);
    } else if (input.includes(ip2)) {
        writeStream2.write(`${input}\n`);
    }
});
