const createGameButton = document.getElementById("create");
const refreshButton = document.getElementById("refresh");
const gamesList = document.getElementById("games-list");

if(document.cookie.indexOf("username") == -1){
	if(document.cookie == '')
		document.cookie = "username="+prompt("Enter your username (you cannot change this! be careful!)");
	else
		document.cookie = ";username="+prompt("Enter your username (you cannot change this! be careful!)");
}

const usernameP = document.getElementById("username")

usernameP.innerText = "Username: "+ getCookie("username")

createGameButton.addEventListener("click", ()=>{
	window.location.href = "/newgame";
})

refreshButton.addEventListener("click", ()=>{
	refresh();
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