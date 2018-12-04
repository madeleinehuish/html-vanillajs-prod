require('dotenv').config();

const API_KEY = process.env.API_KEY;
const ROOT_URL = process.env.ROOT_URL;

const port = 8000;
const express = require("express");

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const axios = require('axios');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true })); //need this for regular form elements
app.use(bodyParser.json());

app.use(express.static(__dirname + "/src/public")); //use static files in ROOT/src folder

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//   next();
// });

app.post("/forms", (request, response) => { //root dir
	console.log('Form received!!!');
	// console.log('request: ', request);
  console.log('request.body: ', request.body);

  response.send("Form Received!!!");
});

//this is for alternate version of youtube call
app.post("/you_tube_server", (request, response) => {
	console.log('YouTube Data Received from front end: ');
  console.log('request.body: ', request.body);

	let params = `?part=snippet&key=${API_KEY}&q=${request.body.term}&maxResults=50&type=video`;

	axios.get(ROOT_URL + params)
			 .then(res => {

				 return res.data;
			 })
			 .then(data => {
				 // data.apiKey = API_KEY;
				 // console.log('data: ', data);
				 response.send(data)
			 })
})

app.get("/getKey", (req, res) => {
	console.log('request received for key: ', req);
	let returnObject = JSON.stringify({ ROOT_URL, API_KEY });
	res.send(returnObject);
})

console.log('listening on port ', port);
app.listen(port);
