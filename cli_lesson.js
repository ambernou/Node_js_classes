#!C:\Program Files\nodejs
const fs = require('fs');
const path = require('path');
// const yargs = require('yargs');
// const readline = require('readline');
const inquirer = require('inquirer');

// const [ path ] = process.argv.slice(2);

// const data = fs.readFileSync(path, 'utf-8');
// console.log(data);

// const options = yargs
//     .usage('Usage: -p <path to the file>')
//     .options('p', {
//         alias: 'path',
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv;

// console.log(options);

// const data = fs.readFileSync(options.p, 'utf-8');
// console.log(data);

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question("Введите путь до файла: ", (filePath) => {
//     console.log(filePath);
//     rl.close();
// });

// const question = async (question) => new Promise(resolve => rl.question(question, resolve));

// (async () => {
//     const filePath = await question("Введите путь до файла: ");
//     const encoding = await question("Введите кодировку: ");
//     const data = fs.readFileSync(filePath, encoding);

//     console.log(data);
//     rl.close();
// })();

const executionDir = process.cwd();
// console.log('dir', executionDir);
const isFile = (path) => fs.lstatSync(path).isFile();
const list = fs.readdirSync(executionDir).filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: 'Выберите файл: ',
        // choices: ['a', 'b', 'c', 'd', 'e'],
        choices: list,
    }
]).then(({ fileName}) => {
    //console.log(answer);
    //const fullPath = path.join(executionDir, fileName);
    const data = fs.readFileSync(fileName, 'utf-8');
    console.log(data);
});
