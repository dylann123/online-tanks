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
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const server = createServer(app);
const io = new Server(server);

const RoomManager = require("./game/RoomManager");
let roomManager = new RoomManager();

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client/home/index.html'));
});

app.get("/getrooms", (req,res)=>{
    res.send(roomManager.getRooms());
})

app.get("/newgame", (req,res)=>{
    let room = roomManager.newGame()
    console.log(`Created new game with id ${room}`);
    res.redirect("/game/" + room);
    
})

app.get("/game/:gameid", (req,res)=>{
    for(let i in roomManager.rooms){
        if(i == req.params.gameid){
            res.sendFile(join(__dirname, 'client/game/index.html'));
            if(roomManager.rooms[i].getPlayerCount() == 8){
                res.send("Game is full");
                return;
            }
            if(req.cookies.username == undefined){
                res.send("You must set a username");
                return;
            }
            roomManager.rooms[i].addPlayer(req.cookies.username);
            return;
        }
    }
    res.sendFile(join(__dirname, 'client/404.html'));
})

io.on('connection', (socket) => {
    socket.on("join", (gameid, name)=>{
        socket.join(gameid);
        console.log(`[Socket.io] ${name} joined room ${gameid}`);
        socket.on('disconnect', ()=>{
            console.log("[Socket.io] "+name+" disconnected from room " + gameid);
            roomManager.getRoom(gameid).removePlayer(name);
        })
    })
});

server.listen(3000, () => {
    console.log('server running');
});