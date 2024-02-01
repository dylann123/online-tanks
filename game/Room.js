const Gamemap = require("./Gamemap.js")
const Player = require("./Player.js")

/**
 * @class Room
 * @description Manages room data, such as players, game options, etc
 */
module.exports = class Room {
    constructor(ownerName, privateGame = false) {
        this.roomid = parseInt((Math.random() * 1000000000).toFixed(0)).toString(36) // hexadecimal room id
        this.names = []
        this.playerCount = 0
        this.privateGame = privateGame
        this.map = new Gamemap()
    }

    getRoomId() {
        return this.roomid
    }

    getRoomStatus() {
        return `RoomID: ${this.getRoomId()}\tCount:${this.playerCount}/8`
    }

    getPlayerCount() {
        return this.playerCount
    }

    getPlayers(){
        return this.names
    }

    getPrivate(){
        return this.privateGame
    }

    addPlayer(name) {
        if (this.playerCount < 8) {
            this.names.push(name)
            this.playerCount++
            return true
        }
        return false
    }

    removePlayer(name) {
        for (let i in this.names) {
            if (this.names[i] == name) {
                this.names[i] = ""
                this.playerCount--
                return true
            }
        }
        return false
    }

    getNames() {
        return this.names
    }
}

