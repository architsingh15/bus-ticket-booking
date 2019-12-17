const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const apiRoutes = require('./routes/ticket')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())


app.use('/api', apiRoutes)

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log("Connected to the DB!")
)


app.listen(3001)

