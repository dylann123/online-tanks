/**
 * @author Dylan Nguyen
 * @description Express.js setup for game
 * Last updated 1/30/24
 */

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
app.use(express.static("client"))
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client/home/index.html'));
});

app.get("/game/:gameid", (req,res)=>{

})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('server running');
});