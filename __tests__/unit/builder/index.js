const { eligibilityConstants } = require('../../../src/constants')
const { getRandomNumberFromRange } = require('../../../src/helpers')

class EletricBillBuilder {
  #data

  constructor() {
    this.#data = {}

    this.#getConsumptionClass()
    this.#getBillingModalities()
    this.#getConnectionType()
    this.#getAverageConsumption()

  }

  #getConsumptionClass() {
    const { eligible: eligibleClasses } = eligibilityConstants.consumptionClasses
    const randomIndex = getRandomNumberFromRange(eligibleClasses.length)

    this.#data.consumptionClass = eligibleClasses[randomIndex]
  }

  #getBillingModalities() {
    const { eligible: eligibleModalities } = eligibilityConstants.billingModalities
    const randomIndex = getRandomNumberFromRange(eligibleModalities.length)

    this.#data.billingModality = eligibleModalities[randomIndex]
  }

  #getConnectionType() {
    const { connectionTypes } = eligibilityConstants
    const randomIndex = getRandomNumberFromRange(connectionTypes.length)

    this.#data.connectionType = connectionTypes[randomIndex]
  }

  #getAverageConsumption() {
    const connectionType = this.#data.connectionType
    const threshold = eligibilityConstants.consumptionThresholdsInKWh[connectionType]
    
    this.#data.averageConsumption = threshold + 1
  }

  withInvalidConsumptionClass() {
    const { ineligible: ineligibleClasses } = eligibilityConstants.consumptionClasses
    const randomIndex = getRandomNumberFromRange(ineligibleClasses.length)

    this.#data.consumptionClass = ineligibleClasses[randomIndex]

    return this
  }

  withInvalidBillingModality() {
    const { ineligible: ineligibleModalities } = eligibilityConstants.billingModalities
    const randomIndex = getRandomNumberFromRange(ineligibleModalities.length)

    this.#data.billingModality = ineligibleModalities[randomIndex]

    return this
  }

  withInvalidAverageConsumption() {
    const connectionType = this.#data.connectionType
    const threshold = eligibilityConstants.consumptionThresholdsInKWh[connectionType]
    
    this.#data.averageConsumption = threshold

    return this
  }

  build() {
    return this.#data
  }
}

module.exports = { EletricBillBuilder }
