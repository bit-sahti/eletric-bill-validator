const calculateAverage = array => {
    const totalSum = array.reduce((total, number) => total += number)

    return totalSum / array.length
}

const calculateAnualCO2Economy = averageConsumption => {
    const anualConsumption = averageConsumption * 12
    const carbonPer1000Kwh = 84
    const anualConsumptionQuotient = anualConsumption / 1000

    return anualConsumptionQuotient * carbonPer1000Kwh
}

const getRandomValuefromArray = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)

    return array[randomIndex]
}

module.exports = { calculateAverage, calculateAnualCO2Economy, getRandomValuefromArray }