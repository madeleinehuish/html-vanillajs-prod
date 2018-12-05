const pokeButton = document.getElementById('pokeButton');
const pokeDiv = document.getElementById('pokemonDiv');
const pokeSearch = document.getElementById('pokeSearch');
const pokeSearchInput = document.getElementById('pokeSearchInput');
const buttonMessage = document.getElementById('buttonMessage');
import '../styles/style.css';

let defaultPokeData = [];
let currentPokeData = [];

pokeButton.addEventListener('click', getPokemonFetch, false);
pokeSearchInput.addEventListener('input', event => {
	console.log(event.target.value);
	let filtered = filterPokemonBySearch(event.target.value);
	if(filtered.length) {
		buildPokemonList(filtered)
	}
	console.log('filtered: ', filtered);
} ,false);

function getPokemon() {
	const xhr = new XMLHttpRequest();

	xhr.onload = () => {
		if(xhr.status===200) {
			let response = JSON.parse(xhr.responseText);
			console.log('response: ', response)
		}
	}
	xhr.open('GET', 'http://pokeapi.co/api/v2/pokemon', true);
	xhr.send(null);
}

async function getPokemonFetch() {
	console.log('poke button pushed, awaiting response...');
	let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=90')
	let json = await response.json();

	console.log('fetch response: ', json);
	pokeDiv.style.display = 'block';
	pokeSearch.style.display = 'block';
	pokeButton.style.display = 'none';
	buttonMessage.style.display = 'none';
	defaultPokeData = json.results;
	buildPokemonList(defaultPokeData);

}

function filterPokemonBySearch(value) {

	let current = defaultPokeData.filter(elem => {
		return (
			elem.name.includes(value)
			&&
			elem.name[0] === value[0]
		)

	})
	if(value==='') current = defaultPokeData;
	return current;
}

function buildPokemonList(data) {
	console.log('data: ',data);
	pokeDiv.innerHTML ='';
	let pokeUl = document.createElement('ul');
	let pokeList = '';

	//alphabetical sort by object name
	let sorted = data.sort((a, b) => {
	    var textA = a.name.toUpperCase();
	    var textB = b.name.toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	console.log('orderedData: ', defaultPokeData);

	for(let elem of sorted) {
		pokeList += `<li class="pokeList" data-name='${elem.name}' data-url='${elem.url}'>${elem.name}</li>`;
	}

	pokeUl.innerHTML = pokeList;
	pokeDiv.appendChild(pokeUl);

	let pokeChildren = pokeUl.children;
	for(let elem of pokeChildren) {
		elem.addEventListener('click', function(event) {
			 getIndividualPokemon(event.target);
		}, false)
	}
}

async function getIndividualPokemon(pokemon) {
	console.log('pokemon data url: ', pokemon.dataset.url);
	let response = await fetch(pokemon.dataset.url);
	let json = await response.json();

	console.log('individual pokemon: ', json);
	const viewport1 = document.getElementById('pokemonViewport1');
	const viewport2 = document.getElementById('pokemonViewport2');
	const viewport3 = document.getElementById('pokemonViewport3');
	const viewport4 = document.getElementById('pokemonViewport4');
	const viewport5 = document.getElementById('pokemonViewport5');
	const pokeName = document.getElementById('pokeName');

	const pokeFrontPic = `<img class='viewport' src=${json.sprites.front_default} alt=''/>`;
	const pokeFrontShiny = `<img class='viewport' src=${json.sprites.front_shiny} alt=''/>`;
	const pokeBackPic = `<img class='viewport' src=${json.sprites.back_default} alt=''/>`;
	const pokeBackShiny = `<img class='viewport' src=${json.sprites.back_shiny} alt=''/>`;
	// viewport.innerHTML = '';
	viewport1.innerHTML = pokeFrontPic;
	viewport2.innerHTML = pokeFrontShiny;
	viewport3.innerHTML = pokeBackPic;
	viewport4.innerHTML = pokeBackShiny;
	pokeName.textContent = json.name;
}
