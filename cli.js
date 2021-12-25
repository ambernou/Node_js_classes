// для запуска кода необходимо ввести: node cli.js -p 'путь к директории/файлу' -s 'строка для поиска' (параметры не обязательны)
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
    .usage('Usage: -p <path to the dir>; -s <search string>')
    .options('p', {
        alias: 'path',
        describe: 'Path to the dir',
        type: 'string',
        default: process.cwd(),
    })
    .options('s', {
        alias: 'str',
        describe: 'Search string',
        type: 'string',
    })
    .argv;

const getList = () => {
    const filesAndDir = fs.readdir(options.p, (err, files) => {
        if (err) {
            console.log('error');
        }

        const fileList = files.map(item => path.join(options.p, item));

        inquirer.prompt([
            {
                name: 'fileName',
                type: 'list',
                message: 'Выберите директорию/файл: ',
                choices: fileList,
            }
        ]).then(({ fileName}) => {

            if (fs.lstatSync(fileName).isFile()) {
                const data = fs.readFileSync(fileName, 'utf-8');
                console.log(data);
                // console.log(data.includes(options.s));
                if (options.s) {
                    const regexp = new RegExp(options.s, 'gmi');
                    let matchAll = data.matchAll(regexp);
                    matchAll = Array.from(matchAll);
                    console.log(`Found ${matchAll.length} matches`);
                }
            } else {
                // console.log('not a file, its a directory');
                options.p = fileName;
                getList();
            }
        });
    });
}

getList();
