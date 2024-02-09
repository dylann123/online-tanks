const Room = require("./Room")

/**
 * @class RoomManager
 * @author Dylan Nguyen
 * @description Manages game rooms
 */

module.exports = class RoomManager{
    constructor(){
        this.rooms = new Map() // roomid --> Room
    }

    /**
     * 
     * @param {string} owner 
     * @param {boolean} priv 
     * @returns room 
     */
    newGame(owner, priv = false){
        let room = new Room(owner, priv)
        this.rooms.set(room.getRoomId(), room)
        return room
    }

    removeRoom(gameid){
        return this.rooms.delete(gameid)
    }

    getRooms(){
        return this.rooms
    }

    getRoomsString(){
        let roomsarr = []
        this.rooms.forEach((item)=>{
            if(!item.getPrivate())
                roomsarr.push(item.getRoomStatus())
        })
        return roomsarr
    }

    /**
     * 
     * @param {String} gameid The game id
     * @returns {Room} The room from the game id; undefined if does not exist
     */
    getRoom(gameid){
        return this.rooms.get(gameid)
    }
}