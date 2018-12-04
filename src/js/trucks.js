//get current date and time
const date = new Date();
const day = date.getDay();
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const hour = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = '0' + minutes;
}
let hour12 = hour;
let twelve;
if(hour>12) {
  hour12 = hour - 12;
  twelve = 'PM'
} else if (hour===12){
  twelve = 'PM';
} else twelve = 'AM';
const timeCurrent = hour12 + ':' + minutes + twelve;
const dayCurrent = days[day];



// //
// //
// //this example uses fetch with async/await
// //
// //
const truckDiv = document.getElementById('truckDiv');
const truckButton = document.getElementById('truckButton');
const trucksCloseButton = document.getElementById('trucksClose');

truckButton.addEventListener('click', async function(){
  truckDiv.style.display = "block";
  trucksCloseButton.style.display = "inline";
  let trucks = await getTrucks();
  placeTrucks(trucks);
}, false);

trucksCloseButton.addEventListener('click', function() {
  truckDiv.innerHTML = '';
  truckDiv.style.display = "none";
  trucksCloseButton.style.display = "none";
}, false);

function placeTrucks(trucks) {
  let ul = document.createElement('ul');
  ul.style.textAlign ="left";
  // ul.style.listStyleType ="circle"; //not working???
  truckDiv.appendChild(ul);
  let truckList = '';
  console.log('trucks: ', trucks);

  for(let truck of trucks) {
    truckList += `<div><li>Name: ${truck.applicant} ~~~~ Location: ${truck.locationdesc}</li></div><br />`;
  }
  ul.innerHTML = truckList;
}

function getTrucks() {

    const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
    const query = `${baseUrl}?dayorder=${day}`;

    const filtered = arr => {
    	const filterThis = arr.filter(elem => {
    		const start24 = Number(elem.start24.substr(0,2));
    		const end24 = Number(elem.end24.substr(0,2));

    		return start24 <= hour && hour < end24;
    	})
    	return filterThis;
    }

    const fetchTrucks = async () => {
  		const response = await fetch(query);
  		const truckArray = await response.json();

  		//filter by current time
  		const truckFiltered = filtered(truckArray);
      console.log('truckFiltered: ', truckFiltered);

  		// //sort list alphabetically with Lodash
  		// const alphabetical = _.sortBy(truckFiltered, ['applicant']);
      //
  		// return alphabetical;
      return truckFiltered;

  	}

  	return fetchTrucks();
  }


  // // //
  // // //
  // // //this example uses fetch classically without async/await (but still uses async await in parts...)
  // // //
  // // //
  // const truckDiv = document.getElementById('truckDiv');
  // const truckButton = document.getElementById('truckButton');
  //
  // truckButton.addEventListener('click', async function(){
  //   let trucks = await getTrucks();
  //   placeTrucks(trucks);
  // }, false);
  //
  // function placeTrucks(trucks) {
  //   let ul = document.createElement('ul');
  //   ul.style.textAlign ="left";
  //   // ul.style.listStyleType ="circle"; //not working???
  //   truckDiv.appendChild(ul);
  //   let truckList = '';
  //   console.log('trucks: ', trucks);
  //
  //   for(let truck of trucks) {
  //     truckList += `<div><li>Name: ${truck.applicant} ~~~~ Location: ${truck.locationdesc}</li></div><br />`;
  //   }
  //   ul.innerHTML = truckList;
  // }
  //
  // function getTrucks() {
  //
  //     const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
  //     const query = `${baseUrl}?dayorder=${day}`;
  //
  //     const filtered = arr => {
  //     	const filterThis = arr.filter(elem => {
  //     		const start24 = Number(elem.start24.substr(0,2));
  //     		const end24 = Number(elem.end24.substr(0,2));
  //
  //     		return start24 <= hour && hour < end24;
  //     	})
  //     	return filterThis;
  //     }
  //
  //     const fetchTrucks = () => {
  //   		return fetch(query)
  //         .then(response => response.json())
  //         .then(res => {
  //           console.log('res: ', res);
  //           return filtered(res);
  //         })
  //
  //   	}
  //
  //   	return fetchTrucks();
  //   }





// // //
// // //
// // //this example uses XMLHttpRequest with async/await only on one function (NOT WORKING...)
// // //
// // //
// const truckDiv = document.getElementById('truckDiv');
// const truckButton = document.getElementById('truckButton');
//
// truckButton.addEventListener('click', function(){
//   const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
//   const query = `${baseUrl}?dayorder=${day}`;
//
//   const filtered = arr => {
//     const filterThis = arr.filter(elem => {
//       const start24 = Number(elem.start24.substr(0,2));
//       const end24 = Number(elem.end24.substr(0,2));
//
//       return start24 <= hour && hour < end24;
//     })
//     return filterThis;
//   }
//
//   const fetchTrucks = () => {
//     let xhr = new XMLHttpRequest();
//     xhr.onload = () => {
//       if(xhr.status===200) {
//         let jsonResponse = JSON.parse(xhr.responseText);
//         console.log('jsonResponse: ', jsonResponse);
//         const truckFiltered = filtered(jsonResponse);
//         console.log('truckFiltered: ', truckFiltered);
//         placeTrucks(trucksFiltered);
//         // return truckFiltered;
//       }
//     }
//     xhr.open('GET', query, true);
//     xhr.send(null)
//   }
//
// }, false);
//
// function placeTrucks(trucks) {
//   let ul = document.createElement('ul');
//   ul.style.textAlign ="left";
//   // ul.style.listStyleType ="circle"; //not working???
//   truckDiv.appendChild(ul);
//   let truckList = '';
//   console.log('trucks: ', trucks);
//
//   for(let truck of trucks) {
//     truckList += `<div><li>Name: ${truck.applicant} ~~~~ Location: ${truck.locationdesc}</li></div><br />`;
//   }
//   ul.innerHTML = truckList;
// }
