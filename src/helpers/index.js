const calculateAverage = array => {}

const calculateCO2Economy = averageConsumption => {}

const getRandomValuefromArray = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)

    return array[randomIndex]
}

module.exports = { calculateAverage, calculateCO2Economy, getRandomValuefromArray }