const express = require('express');
const bodyParser = require('body-parser');  //Used to parse json
const path = require('path');               //Path used for linking frotend
const app = express();
const port = 3115;

const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and pg-promise API' });
});

app.get('/weighins', db.originalQuery);
app.get('/solo', db.singular);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


