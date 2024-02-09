const Vector = require("./Vector")
const Util = require('./util').prototype

module.exports = class Tank {
    constructor(startx, starty, speed = 3) {
        this.x = startx
        this.y = starty
        this.speed = speed
        this.movementVector = new Vector('positional', 0, 0)
    }

    move(direction) {
        switch (direction) {
            case (Util.MOVE_UP):
                this.movementVector.add(new Vector('positional', 0, 1))
                break
            case (Util.MOVE_RIGHT):
                this.movementVector.add(new Vector('positional', 1, 0))
                break
            case (Util.MOVE_DOWN):
                this.movementVector.add(new Vector('positional', 0, -1))
                break
            case (Util.MOVE_LEFT):
                this.movementVector.add(new Vector('positional', -1, 0))
                break
        }
        this.movementVector = this.movementVector.getUnitVector()
        this.movementVector.multiply(this.speed)
    }

    stop(direction) {
        switch (direction) {
            case (Util.MOVE_UP):
                this.movementVector.add(new Vector('positional', 0, -1))
                break
            case (Util.MOVE_RIGHT):
                this.movementVector.add(new Vector('positional', -1, 0))
                break
            case (Util.MOVE_DOWN):
                this.movementVector.add(new Vector('positional', 0, 1))
                break
            case (Util.MOVE_LEFT):
                this.movementVector.add(new Vector('positional', 1, 0))
                break
        }
        this.movementVector = this.movementVector.getUnitVector()
        this.movementVector.multiply(this.speed)
    }

    tick(){
        this.x += this.movementVector.getX()
        this.y += this.movementVector.getY()
    }
}