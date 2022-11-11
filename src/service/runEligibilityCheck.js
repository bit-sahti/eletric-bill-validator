const { eligibilityConstants } = require('../constants')
const { mergeNestedArrays } = require('../helpers')

const runEligibityCheck = ({
  connectionType,
  consumptionClass,
  consumptionSubclass,
  billingModality,
  averageConsumption
}) => {
  const {
    consumptionClasses,
    billingModalities,
    consumptionThresholdsInKWh,
    consumptionSubclasses,
    errors
  } = eligibilityConstants

  const isEligible = (category, value) => category.eligible.includes(value)

  const ineligibilityReasons = []

  if (!isEligible(consumptionClasses, consumptionClass)) {
    ineligibilityReasons.push(errors.invalidConsumpionClass)
  }

  const consumptionSubclassCategories = consumptionSubclasses[consumptionClass]
  
  if (!isEligible(consumptionSubclassCategories, consumptionSubclass)) {
    ineligibilityReasons.push(errors.invalidConsumptionSubclass)
  }

  const allSubCategoryOptions = mergeNestedArrays(consumptionSubclassCategories)

  if (!allSubCategoryOptions.includes(consumptionSubclass)) {
    ineligibilityReasons.push(errors.mismatchingConsumptionClass)
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
