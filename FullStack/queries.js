const pgp = require('pg-promise')();
const connectionString = 'postgres://lion:lion@localhost:5432/lion';
const db = pgp(connectionString); 

const singular = (request, response) => {
  const Goat_id = parseInt(request.query.Goat_id)

  let query = 'SELECT Goat_id, Note FROM NOTE WHERE NOTE.Goat_id = $1'
  let parameters = [Goat_id]

  db.any(query , parameters)
  .then(data => {
    response.status(200).json(data);
  })
  .catch(error => {
    console.error(error);
    response.status(500).send('Internal Server Error');
  });
};

const originalQuery = (request, response) => {
  const startdate = request.query.startdate;
  const enddate = request.query.enddate;
  const startWeight = parseFloat(request.query.startWeight);
  const endWeight = parseFloat(request.query.endWeight);
  const Goat_id = parseFloat(request.query.Goat_id);
  const gender = request.query.gender;
  const breed = request.query.breed;

  let query = 'SELECT WEIGH_IN.Weigh_in_date, WEIGH_IN.Weight, WEIGH_IN.Goat_id, GOAT.breed, GOAT.gender, GOAT.Birth_date, AGE(WEIGH_IN.Weigh_in_date, GOAT.Birth_date) AS age FROM WEIGH_IN JOIN GOAT ON WEIGH_IN.Goat_id = GOAT.Goat_id WHERE WEIGH_IN.Weigh_in_date > $1 AND WEIGH_IN.Weigh_in_date < $2'
  //let query = 'SELECT WEIGH_IN.Weigh_in_date, WEIGH_IN.Weight, WEIGH_IN.Goat_id, GOAT.breed, GOAT.gender FROM WEIGH_IN JOIN GOAT ON WEIGH_IN.Goat_id = GOAT.Goat_id WHERE WEIGH_IN.Weigh_in_date > $1 AND WEIGH_IN.Weigh_in_date < $2'
  let parameters = [startdate,enddate]

if(startWeight != null) { //if front end indicates theres a start weight 
  query += ' AND WEIGH_IN.Weight > $3'
  parameters.push(startWeight)
} 

if(endWeight != null) { //if front end indicates theres an end weight 
  query += ' AND WEIGH_IN.Weight < $' + (parameters.length + 1)
  parameters.push(endWeight)
} 

if(!isNaN(Goat_id)) { //if front end indicates theres a goat_id 
  query += ' AND GOAT.Goat_id = $' + (parameters.length + 1)
  parameters.push(Goat_id)
} 

if(gender != null) { //if front end indicates theres a gender 
  query += ' AND GOAT.gender = $' + (parameters.length + 1)
  parameters.push(gender)
} 

if(breed  != null) { //if front end indicates theres a breed 
  query += ' AND GOAT.breed = $' + (parameters.length + 1)
  parameters.push(breed)
} 


  db.any(query , parameters)
  .then(data => {
    response.status(200).json(data);
  })
  .catch(error => {
    console.error(error);
    response.status(500).send('Internal Server Error');
  });
};


module.exports = {
  originalQuery,
  singular,
};
