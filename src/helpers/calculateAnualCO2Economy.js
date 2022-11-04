const calculateAnualCO2Economy = averageConsumption => {
  const anualConsumption = averageConsumption * 12
  const carbonPer1000Kwh = 84
  const anualConsumptionQuotient = anualConsumption / 1000

  const anualCO2Economy = anualConsumptionQuotient * carbonPer1000Kwh

  //toFixed appends zeros if the number has no decimal places, but the conversion back to number eliminates them
  return Number(anualCO2Economy.toFixed(2))
}

module.exports = calculateAnualCO2Economy