class Util{
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

        this.inputs = {
            UP_DOWN: 1,
            UP_UP: 0,
            DWN_DOWN: 11,
            DWN_UP: 10,
            LFT_DOWN: 21,
            LFT_UP: 20,
            RGT_DOWN: 31,
            RGT_UP: 30,
            M1_DOWN: 101,
            M1_UP: 100,
            M2_DOWN: 201,
            M2_UP: 200
        }
    }
}