const { eligibilityConstants } = require('../constants')
const { calculateAverage, calculateAnualCO2Economy } = require('../helpers')
const { runEligibityCheck } = require('./runEligibilityCheck')
const { saveHistory } = require('./saveHistory')

const eligibilityService = async ({
  documentNumber,
  consumptionHistory,
  connectionType,
  consumptionClass,
  billingModality
}) => {
  const averageConsumption = calculateAverage(consumptionHistory)

  const { eligible, ineligibilityReasons } = runEligibityCheck({
    connectionType,
    consumptionClass,
    billingModality,
    averageConsumption
  })

  const anualCO2Economy = eligible
    ? calculateAnualCO2Economy(averageConsumption)
    : null

  await saveHistory({
    documentNumber,
    eligible,
    connectionType,
    consumptionClass,
    billingModality,
    averageConsumption,
    anualCO2Economy,
    consumptionHistory,
    calcVersion: eligibilityConstants.calcVersion
  })

  return {
    eligible,
    ineligibilityReasons,
    anualCO2Economy
  }
}

module.exports = { eligibilityService }
