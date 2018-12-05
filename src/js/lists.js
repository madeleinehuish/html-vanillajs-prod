let listDataDefault = ['Madeleine', 'Audrey', 'Alicia', 'Sera', 'Julie', 'Bethany', 'Betty','Rachel', 'Colleen', 'Piper', 'Gabbie', 'Hanna', 'Danny',
'Persephone', ];
import '../styles/style.css';

let listContainer = document.getElementById('list-container');

createList(listDataDefault);

let searchInput = document.getElementById('listInput');
searchInput.addEventListener('input', event => {
	console.log('length: ',event.target.value.length);
	let filtered = listDataDefault.filter(elem => {
		return (elem.toUpperCase().includes(event.target.value.toUpperCase())
						&&
						elem.toUpperCase()[0] === event.target.value.toUpperCase()[0]) ;
	})
	if(event.target.value==='') filtered = listDataDefault;
	createList(filtered, event.target.value.length);
}, false);

function createList(listData, leng) {
	let listItems = '';
	for (let elem of listData) {
		let elem1 = elem.substr(0, leng);
		let elem2 = elem.substr(leng, elem.length);
		if(!leng) {
			listItems += '<li>' + elem + '</li>';
		} else {
			listItems += '<li>' + '<b style="color:purple">' + elem1 + '</b>' + elem2 + '</li>';
		}
	}
	listContainer.innerHTML = '<ul>' + listItems + '</ul>';
}
