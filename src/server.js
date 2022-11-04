const { connectToMongo } = require('./config')
const { app } = require('./app')

connectToMongo()

app.listen(
  process.env.PORT || 300,
  console.log(`App listening on port ${process.env.PORT}`)
)
