const createGameButton = document.getElementById("create");
const refreshButton = document.getElementById("refresh");
const gamesList = document.getElementById("games-list");

if(document.cookie.indexOf("username") == -1){
	document.cookie = "username="+prompt("Enter your username (you cannot change this! be careful!)");
}

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