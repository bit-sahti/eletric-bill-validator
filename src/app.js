const express = require('express')
const route = require('./route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', route)

app.listen(3000, console.log(`App listening`))
