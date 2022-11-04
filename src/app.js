require('dotenv').config()

const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger/swagger.json')

const express = require('express')
const route = require('./routes')

const { errorHandler } = require('./middlewares')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/', route)

app.use(errorHandler)

module.exports = { app }
