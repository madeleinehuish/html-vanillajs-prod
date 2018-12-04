const modal = document.querySelector('.modal');
const modalButton = document.querySelector('#modalButton');
const imageContainer = document.querySelector('.img-container');

const getDataButton = document.getElementById('getDataButton');
const startOverButton = document.getElementById('startOverButton');
const modalButtonContainer = document.getElementById('openModalContainer');
const getDataButtonContainer = document.getElementById('getDataButtonContainer');


function modalButtonClick() {
	modal.style.display = "block";
	console.log('modal button is being pressed');
	modalButtonContainer.style.display = "none";
}

// function getDataButtonClick() {
//
// 		// //this uses fetch method
// 		console.log('Fetching data with fetch!!!');
// 		fetch('https://jsonplaceholder.typicode.com/todos/1')
// 		.then(response => {
// 			console.log('fetch response: ', response);
// 			return response.json();
// 		})
// 		.then(json => {
// 			console.log('json: ', json);
// 			imageContainer.innerHTML = `<div>completed: ${json.completed}</div>
// 																	<div>id: ${json.id}</div>
// 																	<div> title: ${json.title}</div>
// 																	<div> userId: ${json.userId}</div>`;
// 			startOverButtonContainer.style.display = "block";
// 			getDataButtonContainer.style.display = "none";
// 		})
//
//
// 		// //this uses XMLHttpRequest()
// 		// console.log('Getting data with XMLHttpRequest')
// 		// let xhr = new XMLHttpRequest();
// 		// xhr.onload = () => {
// 		// 	if(xhr.status===200) {
// 		// 		console.log('xhr: ', xhr);
// 		// 		json = JSON.parse(xhr.responseText);
// 		// 		console.log(json);
// 		// 		imageContainer.innerHTML = `<div>completed: ${json.completed}</div>
// 		// 																<div>id: ${json.id}</div>
// 		// 																<div> title: ${json.title}</div>
// 		// 																<div> userId: ${json.userId}</div>`;
// 		// 		startOverButtonContainer.style.display = "block";
// 		// 		getDataButtonContainer.style.display = "none";
// 		// 	}
// 		// }
// 		// xhr.open('GET','https://jsonplaceholder.typicode.com/todos/1', true);
// 		// xhr.send(null);
// }

// //this uses fetch method with async await
async function getDataButtonClick() {

		console.log('Fetching data with fetch using async/await!!!!');
		let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		let json = await response.json();

		imageContainer.innerHTML = `<div>completed: ${json.completed}</div>
																<div>id: ${json.id}</div>
																<div> title: ${json.title}</div>
																<div> userId: ${json.userId}</div>`;
		startOverButtonContainer.style.display = "block";
		getDataButtonContainer.style.display = "none";

}

function startOverButtonClick() {
	modal.style.display = "none";
	modalButtonContainer.style.display = "block";
	imageContainer.innerHTML = '<img class="my-image" src="http://media.wizards.com/2016/ouhtebrpjwxcnw5_EMN/en_izZS4IXcjO.png">';
	startOverButtonContainer.style.display = "none";
	getDataButtonContainer.style.display = "block";
}

modalButton.addEventListener('click', modalButtonClick, false);
getDataButton.addEventListener('click', getDataButtonClick, false);
startOverButton.addEventListener('click', startOverButtonClick, false);
