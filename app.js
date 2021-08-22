var whiteTurn = true;
const BOARD_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const BLANK_IMG = '<img src="./images/blank.png">';

// Useful functions
const switchTurn = () => {
	whiteTurn = !whiteTurn;
};
const replaceTitle = (h1) => {
	h1.textContent = `${whiteTurn ? "White's" : "Black's"} turn`;
};

// Handling desktop dragging and dropping
const allowDrop = (ev) => ev.preventDefault();

const drag = (ev) => {
	// Capture the current piece's (the image being dragged's) id
	ev.dataTransfer.setData('text', ev.target.id);
	ev.dataTransfer.effectAllowed = 'move';
};

const drop = (ev) => {
	// Change the title and switch the turn
	switchTurn();
	replaceTitle(document.querySelector('h1'));
	ev.preventDefault();

	// Add to the captured pieces menu if a piece touches another piece
	let capturedPieces = document.querySelector('.capturepiece');
	let capturedPiece = ev.target.tagName == 'IMG';

	if (capturedPiece) {
		var pieceBeingReplaced = ev.target.parentNode;
		capturedPieces.appendChild(ev.target);
	} else {
		var pieceBeingReplaced = ev.target;
	}

	// Replacing the tile of the square the piece moves to
	var data = ev.dataTransfer.getData('text');
	let movedPiece = document.getElementById(data);
	pieceBeingReplaced.appendChild(movedPiece);
};

// Handling the mobile side of things
let onMobile = document.documentElement.clientWidth <= 960;
if (onMobile) {
	// Setting custom HTML if the user is on mobile
	let mobileHtml = `
	<h1>ChessBoard</h1>
	<script src="app.js"></script>
	<div class="capturePiece"></div><table><tr><td class="white a 8"><img src="./images/a8.png"></td><td class="black b 8"><img src="./images/b8.png"></td><td class="white c 8"><img src="./images/c8.png"></td><td class="black d 8"><img src="./images/d8.png"></td><td class="white e 8"><img src="./images/e8.png"></td><td class="black f 8"><img src="./images/f8.png"></td><td class="white g 8"><img src="./images/g8.png"></td><td class="black h 8"><img src="./images/h8.png"></td></tr><tr><td class="black a 7"><img src="./images/a7.png"></td><td class="white b 7"><img src="./images/b7.png"></td><td class="black c 7"><img src="./images/c7.png"></td><td class="white d 7"><img src="./images/d7.png"></td><td class="black e 7"><img src="./images/e7.png"></td><td class="white f 7"><img src="./images/f7.png"></td><td class="black g 7"><img src="./images/g7.png"></td><td class="white h 7"><img src="./images/h7.png"></td></tr><tr><td class="white a 6"><img src="./images/blank.png"></td><td class="black b 6"><img src="./images/blank.png"></td><td class="white c 6"><img src="./images/blank.png"></td><td class="black d 6"><img src="./images/blank.png"></td><td class="white e 6"><img src="./images/blank.png"></td><td class="black f 6"><img src="./images/blank.png"></td><td class="white g 6"><img src="./images/blank.png"></td><td class="black h 6"><img src="./images/blank.png"></td></tr><tr><td class="black a 5"><img src="./images/blank.png"></td><td class="white b 5"><img src="./images/blank.png"></td><td class="black c 5"><img src="./images/blank.png"></td><td class="white d 5"><img src="./images/blank.png"></td><td class="black e 5"><img src="./images/blank.png"></td><td class="white f 5"><img src="./images/blank.png"></td><td class="black g 5"><img src="./images/blank.png"></td><td class="white h 5"><img src="./images/blank.png"></td></tr><tr><td class="white a 4"><img src="./images/blank.png"></td><td class="black b 4"><img src="./images/blank.png"></td><td class="white c 4"><img src="./images/blank.png"></td><td class="black d 4"><img src="./images/blank.png"></td><td class="white e 4"><img src="./images/blank.png"></td><td class="black f 4"><img src="./images/blank.png"></td><td class="white g 4"><img src="./images/blank.png"></td><td class="black h 4"><img src="./images/blank.png"></td></tr><tr><td class="black a 3"><img src="./images/blank.png"></td><td class="white b 3"><img src="./images/blank.png"></td><td class="black c 3"><img src="./images/blank.png"></td><td class="white d 3"><img src="./images/blank.png"></td><td class="black e 3"><img src="./images/blank.png"></td><td class="white f 3"><img src="./images/blank.png"></td><td class="black g 3"><img src="./images/blank.png"></td><td class="white h 3"><img src="./images/blank.png"></td></tr><tr><td class="white a 2"><img src="./images/a2.png"></td><td class="black b 2"><img src="./images/b2.png"></td><td class="white c 2"><img src="./images/c2.png"></td><td class="black d 2"><img src="./images/d2.png"></td><td class="white e 2"><img src="./images/e2.png"></td><td class="black f 2"><img src="./images/f2.png"></td><td class="white g 2"><img src="./images/g2.png"></td><td class="black h 2"><img src="./images/h2.png"></td></tr><tr><td class="black a 1"><img src="./images/a1.png"></td><td class="white b 1"><img src="./images/b1.png"></td><td class="black c 1"><img src="./images/c1.png"></td><td class="white d 1"><img src="./images/d1.png"></td><td class="black e 1"><img src="./images/e1.png"></td><td class="white f 1"><img src="./images/f1.png"></td><td class="black g 1"><img src="./images/g1.png"></td><td class="white h 1"><img src="./images/h1.png"></td></tr></table>
	`;
	document.body.innerHTML = mobileHtml;

	// The website's most important elements
	var capturedPieces = document.querySelector('.capturepiece');
	var table = document.querySelector('table');
	var pieceBeingMoved = BLANK_IMG;

	table.addEventListener(
		'click',
		(e) => {
			let imageClicked = e.target.outerHTML;
			let validPiece = isPiece(imageClicked);
			(e.target.tagName == 'IMG' && validPiece && pieceBeingMoved == BLANK_IMG) ? liftPieceHandler(e) : dropPieceHandler(e);
		}
	);
}
function liftPieceHandler(event) {

		pieceBeingMoved = `${event.target.outerHTML}`; //store the piece being moved
		switchTurn();
		event.target.outerHTML = BLANK_IMG; // remove the image of the square
}
function dropPieceHandler(event) {
	console.log('hi')
	let imageClicked = `${event.target.outerHTML}`;
	let validPiece = isPiece(imageClicked);
	if (imageClicked != BLANK_IMG && !validPiece) {
		return;
	}
	if (imageClicked != BLANK_IMG && imageClicked.tagName == "IMG") { // Only append to the captured pieces menu if the 
		capturedPieces.innerHTML += imageClicked;
	}
	event.target.outerHTML = pieceBeingMoved;
	replaceTitle(document.querySelector('h1'));
	pieceBeingMoved = BLANK_IMG;
}
function isPiece(imgClicked) {
	// If it's white's turn, a playable piece must contain 1 or 2 (rows associated with white pieces)
	// If it's black's turn, a playable piece must contain 7 or 8 (rows associated with black pieces)
	const WHITE_ROWS = ['1', '2'];
	const BLACK_ROWS = ['7', '8'];
	if (whiteTurn) {
		return WHITE_ROWS.some((el) => imgClicked.includes(el));
	} else {
		return BLACK_ROWS.some((el) => imgClicked.includes(el));
	}
}