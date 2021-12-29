const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const currentDir = process.cwd();

let filesAndDir = fs.readdirSync(currentDir);

let urlList = '<ul>';
filesAndDir.forEach(item => {
    urlList += `<li><a href=${item}>${item}</a></li>`;
});
urlList += '</ul>';

const server = http.createServer((req, res) => {

    const getList = () => {
        if (req.url === '/') {
            //console.log(urlList);
            res.writeHead(200, 'OK1', {'Content-Type': 'text/html'});
            res.write(urlList);
        }

        filesAndDir.forEach(item => {
            if (req.url === `/${item}`) {
                const filePath = path.join(currentDir, item);
                
                if (fs.lstatSync(filePath).isFile()) {
                    const data = fs.readFileSync(filePath, 'utf-8');
                    //console.log('file');
                    res.writeHead(200, 'OK2', {'Content-Type': 'text/plain'});
                    res.write(`${filePath}\n\n${data}`);
                    res.end();
                } else {
                    //console.log('dir');
                    filesAndDir = fs.readdirSync(filePath);
                    if (filesAndDir.length === 0) {
                        res.end('dir is empty');
                    } else {
                        urlList = '<ul>';
                        filesAndDir.forEach(item => {
                            urlList += `<li><a href=${item}>${item}</a></li>`;
                        });
                        urlList += '</ul>';
                        console.log('path: ', filePath);
                        console.log('list: ', filesAndDir);
                        console.log('url: ', urlList);
                        getList();
                    }
                }
            }
        });
    }

    getList();

});

server.listen(5555);