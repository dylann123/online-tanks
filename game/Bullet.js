const Vector = require("./Vector")

module.exports = class Bullet{
    constructor(startx,starty,vector = new Vector('positional', 0, 0)){
        this.x = startx
        this.y = starty
        this.vector = vector
    }

    tick(){
        this.x += this.vector.getX()
        this.y += this.vector.getY()
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }
}