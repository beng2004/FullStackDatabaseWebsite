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
  
  const getWeightsWhere = (request, response) => {
    const condition = request.params.condition
    const weight = parseFloat(request.params.weight)
    console.log(condition, weight)
    pool.query('SELECT * FROM WEIGH_IN WHERE Weight ' + condition + ' $1',[weight], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  
  module.exports = {
    getAllGoats,
    getWeightsWhere,
  }