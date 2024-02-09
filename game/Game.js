
const Util = require('./util').prototype

module.exports = class Game{
    constructor(players){
        this.status = Util.GAME_WAITING
        this.players = []
        for(let i of this.players)
            this.players.push(i)
        this.bullets = []
    }

    start(){
        this.status = Util.GAME_STARTED
    }

    end(){
        this.status = Util.GAME_ENDING
    }

    init(){
        setInterval(() => {
            this.tick()
        }, 1000/60);
    }

    tick(){
        for(const player in this.players)
            player.tick()
        for(const bullet in this.bullets)
            bullet.tick()
    }

    getGameData(){
        let data = {
            players: this.players,
            bullets: this.bullets
        }
    }

    registerInput(input, playername){

    }
}