const express = require('express')
const morgan = require('morgan')
const DB = require('./config/db/index.js')
const app = express()
const port = 8000
const route = require('./routes/index.routes')


// Connect DB
DB.connect();


app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
route(app)
app.get('/', (req, res) => {
  res.send('Hello Wor2ld!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})