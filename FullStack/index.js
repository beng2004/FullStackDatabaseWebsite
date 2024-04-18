const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3004

const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/goats', db.getAllGoats)
app.get('/weighins/:condition/:weight', db.getWeightsWhere)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

