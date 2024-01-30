const socket = io()	// connect to server socket

socket.emit("join", window.location.pathname.split("/")[2], document.cookie.split("=")[1]);

window.onbeforeunload = function() {
    return true;
};