const Tank = require("./Tank")
const Util = require('./util').prototype

module.exports = class Player{
    constructor(name){
        this.name = name
        this.tank = new Tank(100, 100)
        this.inputs = []
    }

    getTank(){
        return this.tank
    }

    getName(){
        return this.name
    }

    keyDown(action){
        this.tank.move(action)
    }

    keyUp(action){
        this.tank.stop(action)
    }
    
    tick(){
        this.tank.tick()
    }

    getBullet(){
        
    }

    changeInput(input){
        
    }
}