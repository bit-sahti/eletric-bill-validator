const { eligibilityConstants } = require('../constants')
const { calculateAverage, calculateAnualCO2Economy } = require('../helpers')
const { EligibilityCheckHistory } = require('../model')

const runEligibityCheck = ({
  connectionType,
  consumptionClass,
  billingModality,
  averageConsumption
}) => {
  const {
    consumptionClasses,
    billingModalities,
    consumptionThresholdsInKWh,
    errors
  } = eligibilityConstants
  const isEligible = (category, value) => category.eligible.includes(value)

  const ineligibilityReasons = []

  if (!isEligible(consumptionClasses, consumptionClass)) {
    ineligibilityReasons.push(errors.invalidConsumpionClass)
  }

  if (!isEligible(billingModalities, billingModality)) {
    ineligibilityReasons.push(errors.invalidBillingModality)
  }

  const minimalThreshold = consumptionThresholdsInKWh[connectionType]

  if (averageConsumption <= minimalThreshold) {
    ineligibilityReasons.push(errors.minimalConsumptionNotMet)
  }

  const eligible = !ineligibilityReasons.length

  return { eligible, ineligibilityReasons }
}

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

  const anualCO2Economy = eligible ? calculateAnualCO2Economy(averageConsumption) : null

  try {
    const result = await EligibilityCheckHistory.create({
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

    console.log(result)
  } catch (error) {
    console.error(error)
  }

 return {
    eligible,
    ineligibilityReasons,
    anualCO2Economy
  }

}

module.exports = { eligibilityService }
