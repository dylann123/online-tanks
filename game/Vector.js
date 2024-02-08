module.exports = class Vector {
    constructor(type, a = 0, b = 0) {
        this.x = 0
        this.y = 0

        this.quadrant = 0

        if(typeof type == "number")
            alert("invalid")
        if (type == 'directional') { // a = rotation (rad), b = magnitude
            this.x = b * Math.cos(a)
            this.y = b * Math.sin(a)
        } else { // positional; a = x, b = y
            this.x = a
            this.y = b
        }
    }

    getMagnitude() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2))
    }

    getDirectionRad() {
        return -Math.atan(this.y / this.x)
    }

    getDirectionDeg() {
        return Math.atan(this.y / this.x) * 180 / Math.PI
    }

    getUnitVector() {
        if(this.getMagnitude() != 0)
            return new Vector2d('positional',this.x / this.getMagnitude(), this.y / this.getMagnitude())
        else
            return new Vector2d('positional',0,0)
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    setX(x) {
        this.x = x
        this.updateQuadrant()
    }

    setY(y) {
        this.y = y
        this.updateQuadrant()
    }

    updateQuadrant(){
        if(this.x >= 0)
            if(this.y >= 0)
                this.quadrant = 1
            if(this.y < 0)
                this.quadrant = 4
        if(this.x < 0)
            if(this.y >= 0)
                this.quadrant = 2
            if(this.y < 0)
                this.quadrant = 3
    }

    add(vector){
        this.x += vector.getX()
        this.y += vector.getY()
    }

    multiply(vector){
        if(typeof vector == 'number'){
            this.x *= vector
            this.y *= vector
        }else{
            this.x *= vector.getX()
            this.y *= vector.getY()
        }
        return this
    }
    
	toString(){
		return `(${this.x}, ${this.y})`
	}
}