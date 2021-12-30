const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let currentDir = process.cwd();

const server = http.createServer((req, res) => {
    
    let filesAndDir = fs.readdirSync(currentDir);
    let dirName = '';
    
    function getList (files, dn) {
        let urlList = '<ul>';
        files.forEach(item => {
            urlList += `<li><a href=${item}>${dn}/${item}</a></li>`;
        });
        urlList += '</ul>';
        return urlList;
    };

        if (req.url === '/') {
            res.writeHead(200, 'OK1', {'Content-Type': 'text/html'});
            res.write(getList(filesAndDir, dirName));
            res.end();
        } 

        filesAndDir.forEach(item => {
            if (req.url === `/${item}`) {
                const filePath = path.join(currentDir, item);
                // console.log(filePath);
                
                if (fs.lstatSync(filePath).isFile()) {
                    //console.log('file');
                    const data = fs.readFileSync(filePath, 'utf-8');
                    res.writeHead(200, 'OK2', {'Content-Type': 'text/plain'});
                    res.write(`${filePath}\n\n${data}`);
                    res.end();
                } else {
                    //console.log('dir');
                    dirName = item;
                    currentDir = filePath;
                    filesAndDir = fs.readdirSync(currentDir);

                    if (filesAndDir.length === 0) {
                        res.end('dir is empty');
                    } else {
                        res.writeHead(200, 'OK3', {'Content-Type': 'text/html'});
                        res.write(getList(filesAndDir, dirName));
                        res.end();
                    }
                }
            }
        });

});

server.listen(5555);