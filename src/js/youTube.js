//This page was inspired by Stephen Grider's instructional react video on Udemy
//I decided to completely rebuild it with Vanilla JS
//this version makes calls from client side with a quick get to server for api key


const videoSearchBar = document.getElementById('videoSearch');
const videoListDiv = document.getElementById('videoList');
const mainVidScreen = document.getElementById('mainVidScreen');
const vidButton = document.getElementById('vidButton');
const body = document.body;
import '../styles/style.css';

let videoQueue = [];


document.addEventListener("DOMContentLoaded", function(){

  getVideos('vanilla js');

}, false)

mainVidScreen.addEventListener('mouseover', function() {
  const vidFrame = document.getElementById('vidFrame');
  setTimeout(() => {

    vidFrame.style = 'position:relative; z-index: 1; width: 960px; height: 720px; bottom: 210px; z-index:3';
  }, 35);
})

mainVidScreen.addEventListener('mouseout', function() {
  const vidFrame = document.getElementById('vidFrame');
  setTimeout(() => {
      vidFrame.style = 'position:static; width:480px; height:360px; z-index:0'; //try 40% with right margin // width:480px; height:360px;
    })
  }, 35);

// //this version allows for instantaneous search...
// videoSearchBar.addEventListener('input', event => {
//
//   const term = event.target.value || 'javascript';
//
//   if(term!=='') getVideos(term);
//
// }, false)
vidButton.addEventListener('click', event => {

  const term = videoSearchBar.value || 'vanilla js';

  if(term!=='') getVideos(term);
}, false)

body.addEventListener('keydown', event => {

  if(event.keyCode === 13) {
    const term = videoSearchBar.value || 'vanilla js';

    if(term!=='') getVideos(term);
  }
}, false)

//call to youtube for videos using fetch API
async function getVideos(term) {
  //get api key and url
  const res = await fetch('/getKey');
  const json = await res.json();
  let params = `?part=snippet&key=${json.API_KEY}&q=${term}&maxResults=50&type=video`;
  let queryUrl = json.ROOT_URL + params;

  //call to youtube for videos using fetch API
  const res2 = await fetch(queryUrl);
  const json2 = await res2.json();

  // console.log("return data from youtube: ", json);

  videoListDiv.innerHTML = '';
  constructVideoList(json2);
  updateSelectedVideo(json2.items[0].id.videoId);

}

// // //call to youtube for videos using XMLHttpRequest and old-school promise chaining
// // //this will replace getVideos function above as alternate way of calling
// function getVideos(term) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     let json;
//     xhr.open('GET', '/getKey', true);
//     xhr.onload = () => {
//       if(xhr.status === 200) {
//         let response = xhr.responseText;
//         json = JSON.parse(response);
//         resolve(json);
//       } else {
//         reject(Error(xhr.statusText));
//       }
//     }
//     xhr.send();
//   }).then(res => {
//     let params = `?part=snippet&key=${res.API_KEY}&q=${term}&maxResults=50&type=video`;
//     let queryUrl = res.ROOT_URL + params;
//     let json;
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('GET', queryUrl, true);
//       xhr.onload = () => {
//         if(xhr.status === 200) {
//           let response = xhr.responseText;
//           json = JSON.parse(response);
//           resolve(json);
//         } else {
//           reject(Error(xhr.statusText));
//         }
//       }
//       xhr.send();
//     })
//   }).then(res2 => {
//     console.log('res: ', res2);
//     videoListDiv.innerHTML = '';
//     constructVideoList(res2);
//     updateSelectedVideo(res2.items[0].id.videoId);
//   })
// }


function constructVideoList(data) {
  let videoList = '';
  for(let elem of data.items) {

    let vidThumbnail = `<div width="100% style=" margin-left: 10px; margin-right:10px;" class="selectableVids">
                          <span class="queueSpan" style="cursor: pointer; position:relative;top:32px; font-size:large; left: 20px; text-align:center;height:30px; width:30px; border: 2px solid #bcf5bc; float:left"; ><b class="addToQueue" data-id="${elem.id.videoId}">+</b></span>
                          <div data-id="${elem.id.videoId}" style="cursor:pointer;text-align:right;background-color: #ecf5f3;">${elem.snippet.title}
                                <img width="120px" height="90px" src='${elem.snippet.thumbnails.default.url}'/>
                          </div>
                        </div>`;
    videoList += vidThumbnail;
  }
  videoListDiv.innerHTML = videoList;

  let addToQueueElements = document.getElementsByClassName('addToQueue');
  for(let elem of addToQueueElements) {
    elem.addEventListener('click', function(event) {
      //this part stops event propagation when b is clicked
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
      /////
      console.log('event.target: ', event.target);
      addToQueue(event.target.dataset.id);
    })
  }

  for(let elem of videoListDiv.children) {
    // console.log('inside of constructVideoList, elem: ', elem);
    elem.addEventListener('click', function(event) {
      console.log('event.target: ', event.target);
      updateSelectedVideo(event.target.dataset.id)
      console.log('inside of constructVideoList, event.target.dataset.id: ', event.target.dataset.id);
    }, false);
  }
}

function addToQueue(id) {
  console.log('id: ', id)
  videoQueue.push(id);
  console.log('queue changed: ', videoQueue);
}

function updateSelectedVideo(id) {
  console.log('in updateSelectedVideo, id: ', id);
  const url = `https://www.youtube.com/embed/${id}`;
  const height = '360px'; //360px 720px
  const width = '480px';  //480px 960px

  let mainVid = `<iframe id="vidFrame" allowfullscreen="true" height=${height} width=${width} class="iframeClass" src=${url}></iframe>`;

  mainVidScreen.innerHTML = mainVid;

  let vidFrame = document.getElementById('vidFrame');
  vidFrame.addEventListener('onReady', function(event) {
    console.log('video event: ', event);
  }, false);

}







// // //This page was inspired by Stephen Grider's instructional react video on Udemy
// // //I decided to completely rebuild it with Vanilla JS and make the calls from server side
// //  //This version makes calls to youtube from the server
//
//
// const videoSearchBar = document.getElementById('videoSearch');
// const videoListDiv = document.getElementById('videoList');
// const mainVidScreen = document.getElementById('mainVidScreen');
//
//
// document.addEventListener("DOMContentLoaded", function(){
//
//   getVideos('javascript');
//
// }, false)
//
// mainVidScreen.addEventListener('mouseover', function() {
//   const vidFrame = document.getElementById('vidFrame');
//   setTimeout(() => {
//
//     vidFrame.style = 'position:relative; z-index: 1; width: 960px; height: 720px; bottom: 210px';
//   }, 35);
// })
//
// mainVidScreen.addEventListener('mouseout', function() {
//   const vidFrame = document.getElementById('vidFrame');
//   setTimeout(() => {
//       vidFrame.style = 'position:static; width:480px; height:360px;';
//     })
//   }, 35);
//
//
// videoSearchBar.addEventListener('input', event => {
//
//   const term = event.target.value || 'javascript';
//
//   if(term!=='') getVideos(term);
//
// }, false)
//
//
// async function getVideos(term) {
//
//   //send info to server to make the call to youTube
//
//   const response = await fetch('/you_tube_server', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ term })
//   });
//   const content = await response;
//   let contentAsText = await content.text();
//   let json = JSON.parse(contentAsText);
//   console.log('parsed return data: ', json);
//
//   videoListDiv.innerHTML = '';
//   constructVideoList(json);
//   updateSelectedVideo(json.items[0].id.videoId);
//
// }
//
//
// function constructVideoList(data) {
//   let videoList = '';
//   for(let elem of data.items) {
//
//     let vidThumbnail = `<div width="100%" data-id="${elem.id.videoId}" style="background-color: #ecf5f3; margin-left: 10px; text-align:right; margin-right:10px;" class="selectableVids">
//                           ${elem.snippet.title}
//                           <img width="120px" height="90px" src='${elem.snippet.thumbnails.default.url}'/>
//                         </div>`;
//     videoList += vidThumbnail;
//   }
//   videoListDiv.innerHTML = videoList;
//
//   for(let elem of videoListDiv.children) {
//
//     elem.addEventListener('click', function(event) {
//       updateSelectedVideo(event.target.dataset.id)
//
//     }, false);
//   }
// }
//
//
// function updateSelectedVideo(id) {
//
//   const url = `https://www.youtube.com/embed/${id}`;
//   const height = '360px'; //360px 720px
//   const width = '480px';  //480px 960px
//
//   let mainVid = `<iframe id="vidFrame" height=${height} width=${width} class="iframeClass" src=${url}></iframe>`;
//   // allowfullscreen="true"
//   mainVidScreen.innerHTML = mainVid;
//
// }
