const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);
const userList = [];

io.on('connection', client => {
    // console.log(client);

    client.on('set username', (username) => {
        client.username = username;
        
        userList.push(
            {
                author: client.username,
                id: client.id,
            }
        );

        client.broadcast.emit('newUser connect', client.username);
        client.emit('newUser connect', client.username);

        client.broadcast.emit('user list', userList);
        client.emit('user list', userList);
    });

    client.on('client-msg', (data) => {
        // console.log(data);
        const payload = {
            author: client.username,
            message: data.message,
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });

    client.on('disconnect', () => {
        client.broadcast.emit('user disconnect', client.username);
        let index = userList.findIndex(item => item.author == client.username);
        userList.splice(index, 1);
        client.broadcast.emit('user list', userList);
        client.emit('user list', userList);
    });
});

server.listen(5555);
