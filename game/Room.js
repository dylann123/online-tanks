const Gamemap = require("./Gamemap.js")
const Player = require("./Player.js")

/**
 * @class Room
 * @description Manages room data, such as players, game options, etc
 */
module.exports = class Room {
    constructor(ownerName, privateGame = false) {
        this.roomid = parseInt((Math.random() * 1000000000).toFixed(0)).toString(36) // hexadecimal room id
        this.players = []
        this.playerCount = 0
        this.privateGame = privateGame
        this.map = new Gamemap()

        this.WAITING = 0
        this.STARTED = 1
        this.ENDING = 2

        this.status = this.WAITING
    }

    getRoomId() {
        return this.roomid
    }

    getRoomStateString(){
        if(this.status == this.WAITING)
            return "Waiting"
        if(this.status == this.STARTED)
            return "Started"
        return "Ended"
    }

    getRoomState(){
        return this.status
    }

    getRoomStatus() {
        return `RoomID: ${this.getRoomId()}\tCount:${this.playerCount}/8\tStatus:${this.getRoomStateString()}`
    }

    getPlayerCount() {
        return this.playerCount
    }

    getPlayers(){
        return this.players
    }

    getPrivate(){
        return this.privateGame
    }

    getPlayer(name){
        for (const plr of this.players) {
            if(plr != null && plr.getName() == name){
                return plr
            }
        }
        return null
    }

    addPlayer(name) {
        if (this.playerCount < 8) {
            this.players.push(new Player(name))
            this.playerCount++
            return true
        }
        return false
    }

    removePlayer(name) {
        for (let i in this.players) {
            if (this.players[i] != null && this.players[i].getName() == name) {
                this.players[i] = null
                this.playerCount--
                return true
            }
        }
        return false
    }

    getNames() {
        let output = []
        for(let plr of this.players){
            if(plr != null)
                output.push(plr.getName())
        }
        return output
    }

    start(){
        this.status = this.STARTED
    }
}

