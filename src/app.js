const express = require('express')
const { errorHandler } = require('./middlewares')
const route = require('./route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', route)

app.use(errorHandler)

app.listen(3000, console.log(`App listening`))
