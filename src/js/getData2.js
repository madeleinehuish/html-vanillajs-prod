
const dataOutputButton = document.getElementById('dataOutputButton');
const dataOutputButtonTable = document.getElementById('dataOutputButtonTable');
const dataPostButton = document.getElementById('dataPost');
const dataOutputButtonTextButton = document.getElementById('dataOutputButtonText');
const todoListButton = document.getElementById('todoListButton');
const modal = document.querySelector('.modal');
const modalTrigger = document.getElementById('modalButton');
const closeModalButton = document.querySelector('.close-modal-button');

// console.log('closeModalButton', closeModalButton);

const dataOutputDiv = document.getElementById('dataOutput');

let toggle = true;
let toggle2 = true;

//this example shows many different uses of XHR object
const loadText = () => {
	//create XHR Object
	const xhr = new XMLHttpRequest();
	//OPEN- type, url/file, async
	xhr.open('GET', './sampleText.txt', true);

	// // // old way of doing things : onreadystatechange
	// // // readyState values
	// // // 0: request not initialized
	// // // 1: server connection established
	// // // 2: request received
	// // // 3: processing input
	// // // 4: request finished and response is ready
	// console.log('readyState: ', xhr.readyState);
	// xhr.onreadystatechange = () => {
	// 	console.log('readyState: ', xhr.readyState);
	// 	if(xhr.readyState === 4 && xhr.status === 200) {
	// 		dataOutputDiv.innerHTML = xhr.responseText;
	// 	}
	// }

	// // // // can use onprogress for using xhr during stage 3 of readyState (during load)
	// xhr.onprogress = () => {
	// 	console.log('readyState: ', xhr.readyState);
	// 	//so for example could put something like
	// 	if(xhr.readyState === 3) {
	// 		//do something here
	// 	}
	// }

	//onload is the newer way of doing things. goes right from readyState1 to readyState4, skipping 2 and 3
	xhr.onload = () => {
	 console.log('readyState: ', xhr.readyState);
		if(xhr.status === 200) {
			dataOutputDiv.innerHTML = xhr.responseText;
		} else if(xhr.status === 404) console.log('404 : not found') //this is just an example of checking for other statuses
	}

	// // // error handling
	// xhr.onerror = () => {
	// 	console.log('error...')
	// }
	xhr.send();
}

const getData = outputType => {
	let xhr = new XMLHttpRequest();
	xhr.onload = () => {
		if(xhr.status===200) {
			jsonResponse = JSON.parse(xhr.responseText);
			console.log('json response: ', jsonResponse);
			if(outputType==='list') {
				dataToList(jsonResponse);
			} else if(outputType==='table') {
				dataToTable(jsonResponse);
			}
		}

	}
	xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
	xhr.send(null);
}

const dataOutput = data => {
	dataOutputDiv.style = {

	}
	dataOutputDiv.appendChild(data);
}

const dataToList = data => {
	resetData();
	let dataUL = document.createElement('ul');
	dataUL.id = 'dataUL';
	// let dataUL = document.createElement('<ul id="dataUL"></ul>');
	let dataList = ''
	for(let elem of data) {
		dataList += `<li>id: ${elem.id}, userId: ${elem.userId}, title: ${elem.title}</li></br>`
	}
	dataUL.innerHTML = dataList;
		// dataOutputDiv.appendChild(dataUL);
	dataOutput(dataUL);
}

const dataToTable = data => {
	resetData();
	let table = document.createElement('table');
	table.id = 'dataTable';
	let thead = document.createElement('thead');
	thead.innerHTML = `<tr>
												<th>id</th>
												<th>userId</th>
												<th>title</th>
										 </tr>`;
	let tbody = document.createElement('tbody');
	table.appendChild(thead);
	table.appendChild(tbody);

	let dataList = '';
	for(let elem of data) {
		dataList += `<tr>
										<td>${elem.id}</td>
										<td>${elem.userId}</td>
										<td>${elem.title}</td>
								 </tr>`
	}
	tbody.innerHTML = dataList;
	dataOutputDiv.appendChild(table)
}

//this example posts data as json through XMLHttpRequest
const postData = () => {
	let xhr = new XMLHttpRequest();
	let url = 'forms';
	let dataObject = { name:"Madeleine", time:"2pm" };
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('response from server: ',xhr.responseText);
				alert(xhr.responseText);
    }
	}
	xhr.send(JSON.stringify(dataObject));
}

const resetData = () => {
	dataOutputDiv.innerHTML = '';
}

const toggleModal = () => {
	console.log('show modal button clicked')
	modal.classList.toggle('show-modal');
}

const windowOnClick = event => {
	if(event.target === modal) {
		toggleModal();
	}
}


//event listeners

dataOutputButton.addEventListener('click', function() {
	if(toggle) {
		getData('list');
		toggle = !toggle;
	} else {
		resetData();
		toggle = !toggle;
	}
}, false);

dataOutputButtonTable.addEventListener('click', function() {
	if(toggle2) {
		getData('table');
		toggle2 = !toggle2;
	} else {
		resetData();
		toggle2 = !toggle2;
	}
}, false);

dataPostButton.addEventListener('click', function() {
	postData();
}, false);

dataOutputButtonTextButton.addEventListener('click', function() {
	if(toggle2) {
		loadText();
		toggle2 =!toggle2;
	} else {
		resetData();
		toggle2 = !toggle2;
	}
}, false);

modalTrigger.addEventListener('click', toggleModal, false);

closeModalButton.addEventListener('click', toggleModal);

window.addEventListener('click', windowOnClick);

// let data = [];














	//   (async () => {
	//   const rawResponse = await fetch('/you_tube_server', {
	//     method: 'POST',
	//     headers: {
	//       'Accept': 'application/json',
	//       'Content-Type': 'application/json'
	//     },
	//     body: JSON.stringify({a: 1, b: 'Textual content'})
	//   });
	//   const content = await rawResponse;
	//   // const content = await rawResponse.json();
	//
	//   console.log(content);
	// })();


// //this example posts data through fetch
// //there is one problem: response data from server is not coming back...
// function postData() {
// 	let url = '../forms';
// 	let dataObject = { name:"Madeleine", time:"2pm" };
//
// 	fetch(url, {
// 		method: 'POST', // or 'PUT'
// 		body: JSON.stringify(dataObject), //data here can be a string or object
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 	.then(res => {
// 		console.log('res.json(): ', res.json())
// 		return res.json();
// 	})
// 	.catch(error => console.error('Error:', error))
// 	.then(response => console.log('Success:', response));
// }

// //this example sends data as params
// function postData() {
// 	let xhr = new XMLHttpRequest();
// 	let url = '/form';
// 	let params = 'orem=ipsum&name=binny';
// 	xhr.open('POST', url, true);
// 	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 	xhr.onreadystatechange = () => {
//     if(xhr.readyState == 4 && xhr.status == 200) {
//         alert(xhr.responseText);
//     }
// 	}
// 	xhr.send(params);
// }


//do this also with the get trucks API

//figure out event prevent default

//differences between content types

//research jquery ajax method also
