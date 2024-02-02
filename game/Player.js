const Tank = require("./Tank")

module.exports = class Player{
    constructor(name){
        this.name = name
        this.tank = new Tank(100, 100)
    }

    getTank(){
        return this.tank
    }

    getName(){
        return this.name
    }
}