const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/ticket')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use('/api', apiRoutes)

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }
)
mongoose.connection
    .once('open', () => console.log('Connected to the DB successfully'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

app.listen(process.env.PORT || 3003)

