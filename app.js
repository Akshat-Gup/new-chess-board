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
		ev.target.parentNode.replaceChildren();
		node.appendChild(document.getElementById(data))
	} else {
		ev.target.appendChild(document.getElementById(data));
	}
}