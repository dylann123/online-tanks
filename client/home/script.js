const socket = io()

const createGameButton = document.getElementById("create");
const refreshButton = document.getElementById("refresh");
const joinCustomButton = document.getElementById("join-custom");
const gamesList = document.getElementById("games-list");

if(document.cookie.indexOf("username") == -1 || getCookie("username") == "null"){
	let name = prompt("Enter your username (you cannot change this! be careful!)");
	setCookie("username", name, 365);
}

const usernameP = document.getElementById("username")

usernameP.innerText = "Username: "+ getCookie("username")

createGameButton.addEventListener("click", ()=>{
	if(document.getElementById("private").checked == true)
		window.location.href = "/newgame?private=true";
	else
		window.location.href = "/newgame?private=false"
})

refreshButton.addEventListener("click", ()=>{
	refresh();
})

joinCustomButton.addEventListener("click", ()=>{
	let gameid = document.getElementById("gameid").value;
	if(gameid == ""){
		alert("Please enter a game id")
		return
	}
	window.location.href = "/game/"+gameid
})

function refresh(){
	fetch("/getrooms").then(res=>res.json()).then(data=>{
		gamesList.innerHTML = "";
		for(let i in data){
			let gameid = data[i].split(":")[1].split("\t")[0].substring(1)
			gamesList.innerHTML += `<li><a href="/game/${gameid}">${data[i]}</a></li>`
		}
		if(gamesList.innerHTML == ""){
			gamesList.innerHTML = "No games found"
		}
	})
}
refresh()

socket.on("refresh-games", ()=>{
	refresh()
})

// w3schools
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }
  function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }