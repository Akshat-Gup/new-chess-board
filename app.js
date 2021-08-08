let whiteTurn = true;
let h1 = document.querySelector('h1');
function allowDrop(ev) {
	ev.preventDefault();
	ev.dataTransfer.effectAllowed = "move";
}
  
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	console.log(ev.target)
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