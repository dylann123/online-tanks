module.exports = class Util{
    constructor(){
        // constants

        // Room constants
        this.GAME_WAITING = 0;
        this.GAME_STARTED = 1;
        this.GAME_ENDING = 2;

        // Movement constants
        this.MOVE_UP = 0;
        this.MOVE_RIGHT = 1;
        this.MOVE_DOWN = 2;
        this.MOVE_LEFT = 3;
    }
}