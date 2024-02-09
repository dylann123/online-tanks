const socket = io()	// connect to server socket

socket.emit("join", window.location.pathname.split("/")[2], document.cookie.split("=")[1]);

window.onbeforeunload = function() {
    return true;
};

let gamestate = {
    players: [],
    bullets: [],
    status: "waiting",
    playerCount: 0
}

setInterval(() => {
    
}, 1000/60);

socket.on("start", function (datastr){
    console.log("game started");
    console.log(datastr);
    gamestate = JSON.parse(datastr)
})

socket.on("update", function (datastr){
    console.log(datastr);
    gamestate = JSON.parse(datastr)
})

document.addEventListener("keydown", (e) => {
    if(e.key == "w"){
        socket.emit("input", Util.prototype.inputs.UP_DOWN)
    }
    if(e.key == "a"){
        socket.emit("input", Util.prototype.inputs.LFT_DOWN)
    }
    if(e.key == "s"){
        socket.emit("input", Util.prototype.inputs.DWN_DOWN)
    }
    if(e.key == "d"){
        socket.emit("input", Util.prototype.inputs.RGT_DOWN)
    }
})

document.addEventListener("keyup", (e) => {
    if(e.key == "w"){
        socket.emit("input", Util.prototype.inputs.UP_UP)
    }
    if(e.key == "a"){
        socket.emit("input", Util.prototype.inputs.LFT_UP)
    }
    if(e.key == "s"){
        socket.emit("input", Util.prototype.inputs.DWN_UP)
    }
    if(e.key == "d"){
        socket.emit("input", Util.prototype.inputs.RGT_UP)
    }
})