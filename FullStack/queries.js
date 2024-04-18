const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lion',
  host: 'localhost',
  database: 'lion',
  password: 'lion',
  port: 5432,
})

const getAllGoats = (request, response) => {
    pool.query('SELECT * FROM goat', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getWeightsAfter = (request, response) => {
    const date = new String(request.params.date)
    console.log(date)
    pool.query('SELECT * FROM WEIGH_IN WHERE Weigh_in_date > $1',[date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  
  module.exports = {
    getAllGoats,
    getWeightsAfter,
  }