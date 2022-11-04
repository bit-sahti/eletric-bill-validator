const mongoose = require('mongoose')

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)

    console.log(`Connected to database.`)
  } catch (error) {
    console.error('Failed to connect to database', error)
  }
}

module.exports = { connectToMongo }
