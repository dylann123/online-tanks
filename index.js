/**
 * @author Dylan Nguyen
 * @description Express.js setup for game
 * Last updated 1/30/24
 */

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fs = require("fs")

const CHECK_EMPTY_ROOMS_MS = 5 * 1000

const app = express();
app.use(express.static("client"))
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const server = createServer(app);
const io = new Server(server);

const RoomManager = require("./game/RoomManager");
const Util = require('./game/util').prototype;
let roomManager = new RoomManager();

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'client/home/index.html'));
});

app.get("/getrooms", (req, res) => {
    res.send(roomManager.getRoomsString());
})

app.get("/newgame", (req, res) => {
    for (let [_, room] of roomManager.getRooms()) {
        if (room.getPlayers().includes(req.cookies.username)) {
            res.send("You are already in a game. <a href='/'>go back!!</a>");
            return
        }
    }
    let room = roomManager.newGame(req.cookies.username, req.query.private == "true" ? true : false)
    console.log(`Created new ${room.getPrivate() ? "private" : "public"} game with id ${room.getRoomId()}`);
    res.redirect("/game/" + room.getRoomId());
    io.emit("refresh-games")
    setTimeout(() => {
        for (let [_, room] of roomManager.getRooms()) {
            if (room.getPlayerCount() == 0) {
                console.log("clearing empty room " + room.getRoomId());
                roomManager.removeRoom(room.getRoomId())
            }
        }
    }, CHECK_EMPTY_ROOMS_MS);
})

app.get("/game/:gameid", (req, res) => {
    for (let [_, room] of roomManager.getRooms()) {
        if (room.getPlayer(req.cookies.username) != null) {
            res.send("You are already in a game. <a href='/'>go back!!</a>");
            return
        }
        if (room.getRoomId() == req.params.gameid) {
            if (room.getPlayerCount() == 8) {
                res.send("Game is full. <a href='/'>go back!!</a>");
            } else if (req.cookies.username == undefined) {
                res.sendFile(join(__dirname, 'client/404.html'));
            } else if (room.getPlayers().includes(req.cookies.username)) {
                res.send("You are already in a game. <a href='/'>go back!!</a>");
            }
            else {
                room.addPlayer(req.cookies.username);
                res.send(fs.readFileSync(join(__dirname, 'client/game/index.html')).toString());
            }
            return
        }
    }
    res.send("Invalid game. <a href='/'>go back!!</a>");
})

io.on('connection', (socket) => {
    socket.on("join", (gameid, name) => {
        if (!roomManager.getRoom(gameid)) return
        socket.join(gameid);
        io.in(gameid).emit("refreshplayers")
        console.log(`[Socket.io] ${name} joined room ${gameid}`);
        socket.on('disconnect', () => {
            console.log("[Socket.io] " + name + " disconnected from room " + gameid);
            roomManager.getRoom(gameid).removePlayer(name);
            if (roomManager.getRoom(gameid).getPlayerCount() == 0) {
                console.log("[Socket.io] Room " + gameid + " is empty. Closing room.");
                roomManager.removeRoom(gameid)
                io.emit("refresh-games")
            }
        })
        socket.on('start', () => {
            if (roomManager.getRoom(gameid).getOwner() != name) return
            roomManager.getRoom(gameid).start()
            io.in(gameid).emit("start", roomManager.getRoom(gameid).getGame().getGameData())
            console.log(`[Socket.io] ${name} started game ${gameid}`);
        })
        socket.on('input', (input) => {
            roomManager.getRoom(gameid).getGame().registerInput(input, name)
            io.in(gameid).emit("update", roomManager.getRoom(gameid).getGame().getGameData())
            console.log(`[Socket.io] ${name} input ${input}`);
        })
    })
});

server.listen(3000, () => {
    console.log('server running');
});