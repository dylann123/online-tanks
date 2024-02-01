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

    newGame(){
        let room = new Room()
        this.rooms.set(room.getRoomId(), room)
        return room.getRoomId()
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
            roomsarr.push(item.getRoomStatus())
        })
        return roomsarr
    }

    getRoom(gameid){
        return this.rooms.get(gameid)
    }
}