const runEligibityCheck = ({
  connectionType,
  consumptionClass,
  billingModality,
  averageConsumption,
  eligibilityConstants
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

module.exports = { runEligibityCheck }
