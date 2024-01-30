const Room = require("./Room")

/**
 * @class RoomManager
 * @author Dylan Nguyen
 * @description Manages game rooms
 */

class RoomManager{
    constructor(){
        /**
         * @param "roomid": Room
         */
        let rooms = {}
    }

    newGame(){
        let room = new Room()
        rooms[room.getRoomId()] = room
    }

    getRooms(){
        let str = ""
        for(let i of rooms){
            str += i.getRoomStatus() + "\n"
        }
        return str
    }

    getRoom(gameid){
        for(let i in rooms){
            if(i == gameid){
                return this.rooms[i]
            }
        }
    }
}