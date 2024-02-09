const Tank = require("./Tank")
const Util = require('./util').prototype

module.exports = class Player{
    constructor(name){
        this.name = name
        this.tank = new Tank(100, 100)
        this.inputs = {}
    }

    getTank(){
        return this.tank
    }

    getName(){
        return this.name
    }

    keyDown(action){
        this.inputs[action] = true
    }

    keyUp(action){
        this.inputs[action] = false
    }
    
    tick(){
        if(this.inputs[Util.inputs.UP_DOWN])
            this.tank.moveIn(Util.MOVE_UP)
        if(this.inputs[Util.inputs.UP_UP])
            this.tank.stop(Util.MOVE_UP)
        if(this.inputs[Util.inputs.DWN_DOWN])
            this.tank.moveIn(Util.MOVE_DOWN)
        if(this.inputs[Util.inputs.DWN_UP])
            this.tank.stop(Util.MOVE_DOWN)
        if(this.inputs[Util.inputs.LFT_DOWN])
            this.tank.moveIn(Util.MOVE_LEFT)
        if(this.inputs[Util.inputs.LFT_UP])
            this.tank.stop(Util.MOVE_LEFT)
        if(this.inputs[Util.inputs.RGT_DOWN])
            this.tank.moveIn(Util.MOVE_RIGHT)
        if(this.inputs[Util.inputs.RGT_UP])
            this.tank.stop(Util.MOVE_RIGHT)
    
        this.tank.tick()
    }

    getBullet(){
        
    }

    registerInput(input){
        if(input%2 == 0)
            this.keyUp(input)
        else
            this.keyDown(input)
    }

    pointIsIn(x, y){
        return this.tank.pointIsIn(x, y)
    }

    hit(){
        this.tank.hit()
    }
}