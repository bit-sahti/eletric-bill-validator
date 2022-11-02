const calculateAverage = array => {
  const totalSum = array.reduce((total, number) => (total += number))

  return totalSum / array.length
}

const calculateAnualCO2Economy = averageConsumption => {
  const anualConsumption = averageConsumption * 12
  const carbonPer1000Kwh = 84
  const anualConsumptionQuotient = anualConsumption / 1000

  return anualConsumptionQuotient * carbonPer1000Kwh
}

const getRandomValuefromArray = array => {
  const randomIndex = Math.floor(Math.random() * array.length)

  return array[randomIndex]
}

const mergeNestedArrays = category =>
  Object.values(category).flatMap(array => array)

// copied and modified from example code
const enumOf = values => ({
  type: typeof values[0],
  valuesEnum: values,
  example: values[0]
})

module.exports = {
  calculateAverage,
  calculateAnualCO2Economy,
  getRandomValuefromArray,
  mergeNestedArrays,
  enumOf
}
