const Gamemap = require("./Gamemap.js")
const Player = require("./Player.js")

/**
 * @class Room
 * @description Manages room data, such as players, game options, etc
 */
module.exports = class Room{
    constructor(){
        const roomid = (Math.random() * 1000000).toFixed(0).toString(16) // hexadecimal room id
        let p1name, p2name, playerCount, passwordRequired
        let map = new Gamemap()
    }

    getRoomId(){
        return this.roomid
    }

    getRoomStatus(){
        return `RoomID: ${this.getRoomId()}\tCount:${this.playerCount}/8\tPrivate: ${passwordRequired}`
    }
}

