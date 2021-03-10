/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const cors = require('cors')
const routes = require('./app/routes')


const app = express()

app.use(cors())

require("./cacheManager");


app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
	// eslint-disable-next-line no-tabs
	res.status(200).send('Welcome to the Node.js Cache and Performance App')
})

// add routes here
routes(app)


// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	console.log(err)
	err.status = 404
	res.send('Route not found')
	next(err)
})

app.listen(process.env.PORT || config.port, () => {
	console.log(`${config.name} listening on port ${config.port}!`)
})

module.exports = app
