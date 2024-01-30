const Room = require("./Room")

/**
 * @class RoomManager
 * @author Dylan Nguyen
 * @description Manages game rooms
 */

module.exports = class RoomManager{
    constructor(){
        /**
         * @param "roomid": Room
         */
        this.rooms = {}
    }

    newGame(){
        let room = new Room()
        this.rooms[room.getRoomId()] = room
        return room.getRoomId()
    }

    getRooms(){
        let roomsarr = []
        for(let i in this.rooms){
            roomsarr.push(this.rooms[i].getRoomStatus())
        }
        return roomsarr
    }

    getRoom(gameid){
        for(let i in this.rooms){
            if(i == gameid){
                return this.rooms[i]
            }
        }
    }
}