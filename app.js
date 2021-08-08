if(window.innerWidth <= 768) {
	location.href = "https://akshat-gup.github.io/Chess-Board/";
}
let whiteTurn = true;
let h1 = document.querySelector('h1');
function allowDrop(ev) {
	let whiteCase = whiteTurn && (String(ev.target.parentNode.classList).includes("1") || String(ev.target.parentNode.classList).includes("2"));
	let blackCase = (!whiteTurn) && (String(ev.target.parentNode.classList).includes("7") || String(ev.target.parentNode.classList).includes("8"));
	if(whiteCase || blackCase) {
		ev.preventDefault();
		console.log('h')
		ev.dataTransfer.effectAllowed = "move";
	} else {
		ev.dataTransfer.effectAllowed = "none";
	}
	ev.preventDefault();
	
}
  
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	ev.dataTransfer.effectAllowed = "move";
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	console.log(ev.target.tagName)
	if (ev.target.tagName == "IMG") {
		let node = ev.target.parentNode;
		capturedPieces = document.querySelector('.capturepiece');
		capturedPieces.appendChild(ev.target);
		//ev.target.parentNode.replaceChildren();
		node.appendChild(document.getElementById(data))
	} else {
		ev.target.appendChild(document.getElementById(data));
	}
	whiteTurn = !whiteTurn;
	h1.textContent = `It's ${whiteTurn ? "White's" : "Black's"} turn`;
}