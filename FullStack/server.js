const express = require('express'); //required for api
const bodyParser = require('body-parser');  //Used to parse json
const path = require('path');               //Path used for linking frotend
const app = express();
const port = 3115;  //port of website

const db = require('./queries');  //requires our queries

//alllows us to send and recieve json bodies
app.use(bodyParser.json());

//parse bodies from url data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//express configuration
app.use(express.static(path.join(__dirname, 'public')));

//sends json response on startup load root director
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and pg-promise API' });
});

//queries the requests to our db code
app.get('/weighins', db.originalQuery);
app.get('/solo', db.singular);

//allows use to listen for requests
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


