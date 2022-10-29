const { elegibilityConstants } = require('../../../src/constants')
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
    const { eligible: eligibleClasses } = elegibilityConstants.consumptionClasses
    const randomIndex = getRandomNumberFromRange(eligibleClasses.length)

    this.#data.consumptionClass = eligibleClasses[randomIndex]
  }

  #getBillingModalities() {
    const { eligible: eligibleModalities } = elegibilityConstants.billingModalities
    const randomIndex = getRandomNumberFromRange(eligibleModalities.length)

    this.#data.billingModality = eligibleModalities[randomIndex]
  }

  #getConnectionType() {
    const { connectionTypes } = elegibilityConstants
    const randomIndex = getRandomNumberFromRange(connectionTypes.length)

    this.#data.connectionType = connectionTypes[randomIndex]
  }

  #getAverageConsumption() {
    const connectionType = this.#data.connectionType
    const threshold = elegibilityConstants.consumptionThresholdsInKWh[connectionType]
    
    this.#data.averageConsumption = threshold + 1
  }

  build() {
    return this.#data
  }
}

module.exports = { EletricBillBuilder }
