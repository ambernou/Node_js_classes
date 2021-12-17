const fs = require('fs');
const ACCESS_LOG_TEST = './access_test.log';
const ACCESS_LOG = './access.log';
const IP1_REQUESTS_LOG = './89.123.1.41_requests.log';
const IP2_REQUESTS_LOG = './34.48.240.111_requests.log';
const readline = require('readline');

const readStream = fs.createReadStream(ACCESS_LOG, {
    flag: 'r',
    encoding: 'utf-8',
    highWaterMark: 512,
    // end: 64 * 512,
});

const writeStreamIP1 = fs.createWriteStream(IP1_REQUESTS_LOG, {
    encoding: 'utf-8',
    flags: 'a',
});

const writeStreamIP2 = fs.createWriteStream(IP2_REQUESTS_LOG, {
    encoding: 'utf-8',
    flags: 'a',
});

const rl = readline.createInterface({
    input: readStream,
    //output:
});

rl.on('line', (input) => {
    //console.log(`${input}`);
    if (input.includes('89.123.1.41')) {
        writeStreamIP1.write(`${input}\n`);
    } else if (input.includes('34.48.240.111')) {
        writeStreamIP2.write(`${input}\n`);
    }
});

