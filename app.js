var whiteTurn = true;
const BOARD_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const BLANK_IMG = '<img src="./images/blank.png">';

const switchTurn = () => {
	whiteTurn = !whiteTurn;
};
const replaceTitle = (h1) => {
	h1.textContent = `${whiteTurn ? "White's" : "Black's"} turn`;
};
const isPiece = (imgClicked) => {
	// If it's white's turn, a playable piece must contain 1 or 2 (rows associated with white pieces)
	// If it's black's turn, a playable piece must contain 7 or 8 (rows associated with black pieces)
	const WHITE_ROWS = ['1', '2'];
	const BLACK_ROWS = ['7', '8'];
	if (whiteTurn) {
		return WHITE_ROWS.some((el) => imgClicked.includes(el));
	} else {
		return BLACK_ROWS.some((el) => imgClicked.includes(el));
	}
};

const allowDrop = (ev) => ev.preventDefault();

const drag = (ev) => {
	ev.dataTransfer.setData('text', ev.target.id);
	ev.dataTransfer.effectAllowed = 'move';
};

const drop = (ev) => {
	let heading = document.querySelector('h1');
	replaceTitle(heading);
	switchTurn();
	ev.preventDefault();

	let capturedPieces = document.querySelector('.capturepiece');
	let capturedPiece = ev.target.tagName == 'IMG';
	if (capturedPiece) {
		var pieceBeingReplaced = ev.target.parentNode;
		capturedPieces.appendChild(ev.target);
	} else {
		var pieceBeingReplaced = ev.target;
	}

	var data = ev.dataTransfer.getData('text');
	let movedPiece = document.getElementById(data);
	pieceBeingReplaced.appendChild(movedPiece);
};

const createTable = () => {
	let table = document.createElement('table');

	// (9-i) = row & BOARD_LETTERS(j-1) = column
	for (var i = 1; i <= 8; i++) {
		var tableRow = document.createElement('tr');
		for (var j = 1; j <= 8; j++) {
			var columnElement = document.createElement('td');
			let squareName = `${BOARD_LETTERS[j - 1]} ${9 - i}`;

			// A square is white if both row and column have the same modulus
			if (i % 2 == j % 2) {
				columnElement.className = `white ` + squareName;
			} else {
				columnElement.className = `black ` + squareName;
			}
			// If the rows are in the rangee 7-8 or 1-2, fill the pieceBeingMoved with pieces
			columnElement.innerHTML =
				i > 6 || i < 3
					? `<img src="./images/${BOARD_LETTERS[j - 1]}${
							9 - i
					  }.png"/>`
					: BLANK_IMG;
			tableRow.appendChild(columnElement);
		}
		table.appendChild(tableRow);
	}
	document.body.appendChild(table);
	return table;
};

const createCapturedPieces = () => {
	let capturedPieces = document.createElement('div');
	capturedPieces.classList.add('capturePiece');
	document.body.appendChild(capturedPieces);
	return capturedPieces;
};

const liftPieceHandler = (event) => {
	let imageClicked = event.target.outerHTML;
	let validPiece = isPiece(imageClicked);
	if (validPiece) {
		pieceBeingMoved = `${imageClicked}`;
		switchTurn();
		event.target.outerHTML = BLANK_IMG; // remove the image of the square
	}
	table.addEventListener(
		'click',
		(e) => {
			if (e.target.tagName == 'IMG') {
				validPiece ? dropPieceHandler(e) : liftPieceHandler(e);
			}
		},
		{ once: true }
	);
};
const dropPieceHandler = (event) => {
	let imageClicked = String(event.target.outerHTML);
	if (imageClicked != BLANK_IMG) {
		capturedPieces.innerHTML += imageClicked;
	}
	event.target.outerHTML = pieceBeingMoved;
	replaceTitle(title);
	table.addEventListener(
		'click',
		(e) => {
			if (String(e.target.tagName) == 'IMG') {
				liftPieceHandler(e);
			}
		},
		{ once: true }
	);
};

let onMobile = document.documentElement.clientWidth <= 960;
if (onMobile) {
	// Setting custom HTML if the user is on mobile
	let mobileHtml = `
		<h1>ChessBoard</h1>
		<div class="capturePiece" id="piece-menu"></div>
		<script src="app.js"></script>
	`;
	document.body.innerHTML = mobileHtml;

	// The website's most important elements
	var capturedPieces = createCapturedPieces();
	var table = createTable();
	var title = document.querySelector('h1');
	var pieceBeingMoved;

	table.addEventListener(
		'click',
		(e) => {
			if (String(e.target.tagName) == 'IMG') {
				// preventing users from clicking on the table directly
				liftPieceHandler(e);
			}
		},
		{ once: true }
	);
}
