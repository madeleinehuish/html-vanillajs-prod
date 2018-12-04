require('./js/dropdown');


let table = document.getElementById('tableId');
let tableBody = document.getElementById('tableBody');
let showElem = document.getElementById('showElem');
let tableColumns = document.querySelectorAll('td');

let clearButton = document.getElementById('clearButton');
let searchInput = document.getElementById('testInputBox');
let tableInput = document.getElementById('tableInput');

for(let column of tableColumns) {
	column.addEventListener('click', click, false);
	column.addEventListener('mouseover', hover, false);
	column.addEventListener('mouseout', hoverExit, false);
}

if(clearButton) clearButton.addEventListener('click', clear, false);

if(searchInput) searchInput.addEventListener('input', event => {
	console.log('searchInput: ',event.target.value);
	let inputContainer = document.getElementById('testInput');
	inputContainer.innerHTML = '<div>' + event.target.value + '</div>';
	inputContainer.className = 'testInputClass';
}, false);

if(tableInput) tableInput.addEventListener('input', event => {
	console.log('tableInput: ',event.target.value);
	if(event.target.value==='') {
		for(let td of tableColumns) {
			console.log('row: ', td);
			td.style.backgroundColor = '#ecf5f3';
		}
	}
	let found = null;
	let from = null;
	let tableNumbersNumbers = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	let tableNumbersWords = [null,'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'];
	if (tableNumbersNumbers.includes(Number(event.target.value)) || tableNumbersWords.includes(event.target.value)) {
			if(tableNumbersNumbers.includes(Number(event.target.value))) found = Number(event.target.value);
			else found = tableNumbersWords.indexOf(event.target.value);

			if(found > 11) from = found - 10;
			else if (found > 5) from = found - 5;
			else from = found;

			let foundParent = Math.ceil(found/5)-1;

			let foundElem = tableBody.children[foundParent].children[from-1];
			foundElem.style.backgroundColor = 'green';
	}
})

function hover(e) {
	let target = e.target;
	console.log('target: ', target);
	target.style.backgroundColor = '#f1d2fc';
}

function hoverExit(e) {
	let target = e.target;
	console.log('target: ', target);
	target.style.backgroundColor = '#ecf5f3';
}

function click(e) {
	let target = e.target;
	let newDiv = '<div>' + e.target.textContent + '</div>';
	showElem.innerHTML = newDiv;
	console.log(target);
}

function clear() {
	let newDiv = '<div></div>';
	showElem.innerHTML = newDiv;
	for(let td of tableColumns) {
		console.log('row: ', td);
		td.style.backgroundColor = '#ecf5f3';
	}
	tableInput.value = '';
}


//1. find nth element from search bar
//2. do a complex node with text, span and locate something inside
