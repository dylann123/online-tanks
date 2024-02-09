
const Util = require('./util').prototype

module.exports = class Game {
    constructor(players) {
        this.status = Util.GAME_WAITING
        this.players = []
        for (let i of this.players)
            this.players.push(i)
        this.bullets = []
        setInterval(() => {
            if (this.status == Util.GAME_STARTED)
                this.tick()
        }, 1000 / 60);
    }

    start() {
        this.status = Util.GAME_STARTED
    }

    end() {
        this.status = Util.GAME_ENDING
    }

    tick() {
        for (const player in this.players)
            player.tick()
        for (const bullet in this.bullets)
            bullet.tick()
    }

    checkCollisions() {
        for (const player in this.players)
            for (const bullet in this.bullets)
                if (player.pointIsIn(bullet.x, bullet.y))
                    player.hit()
    }

    getGameData() {
        let data = {
            players: [],
            bullets: [],
            status: this.status,
            playerCount: this.players.length,
        }

        for (const player in this.players) {
            data.players.push({
                x: player.tank.x,
                y: player.tank.y,
                name: player.name,
                movementVector: player.tank.movementVector,
                speed: player.tank.speed,
                health: player.tank.health
            })
        }

        for (const bullet in this.bullets) {
            data.bullets.push({
                x: bullet.x,
                y: bullet.y,
                movementVector: bullet.movementVector,
                speed: bullet.speed
            })
        }

        return JSON.stringify(data)
    }

    registerInput(input, playername) {
        for (const player in this.players)
            if (player.getName() == playername)
                player.registerInput(input)
    }
}