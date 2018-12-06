import '../styles/style.css';

//new dropdown allows for multiple drop downs by selecting previous Sibling
const dropDownTrigger = document.querySelectorAll('.dropDownTrigger');

let overDropDown = false;

for(let elem of dropDownTrigger) { //elem is each individual dropDownTrigger

  const dropDown = elem.previousElementSibling;

	//mouseover for elem
	elem.addEventListener('mouseover', function() {
		dropDown.style.display="inline-block"; //sets each individual dropDown element by hitting previousSibling
		dropDown.addEventListener('mouseover', function() {

			dropDown.style.display="inline-block";
			overDropDown = true;

		}, false);


		dropDown.addEventListener('mouseleave', function() {

			dropDown.style.display="none";
			overDropDown = false;

		}, false);

	}, false);

	//mouseout for elem
	elem.addEventListener('mouseout', function() {

		setTimeout(() => {
			if(overDropDown === false) {
				dropDown.style.display="none";
			} else return
		}, 100)


	}, false);
}






// //old version
// const dropDownTrigger = document.querySelector('.dropDownTrigger');
// const dropDown = document.querySelector('.dropDown');
//
// let overDropDown = false;
//
//
// dropDownTrigger.addEventListener('mouseover', function() {
//
// 	dropDown.style.display="inline-block";
//
//
// }, false);
//
// dropDown.addEventListener('mouseover', function() {
//
// 	dropDown.style.display="inline-block";
// 	overDropDown = true;
//
// }, false);
//
//
// dropDown.addEventListener('mouseleave', function() {
//
// 	dropDown.style.display="none";
// 	overDropDown = false;
//
// }, false);
//
// dropDownTrigger.addEventListener('mouseout', function() {
//
// 	setTimeout(() => {
// 		if(overDropDown === false) {
// 			dropDown.style.display="none";
// 		} else return
// 	}, 100)
//
//
// }, false);
