const calculateAverage = array => {
  const totalSum = array.reduce((total, number) => (total += number))

  return totalSum / array.length
}

module.exports = calculateAverage
