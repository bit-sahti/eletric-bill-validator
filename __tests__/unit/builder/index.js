const { eligibilityConstants } = require('../../../src/constants')
const { getRandomValuefromArray } = require('../../../src/helpers')

class EletricBillBuilder {
  #data

  constructor() {
    this.#data = {}

    this.#getDocumentNumber()
    this.#getConsumptionHistory()
    this.#getConsumptionClass()
    this.#getBillingModalities()
    this.#getConnectionType()
    this.#getAverageConsumption()
  }

  #getDocumentNumber() {
    this.#data.documentNumber = '12345678912'
  }

  #getConsumptionHistory() {
    this.#data.consumptionHistory = [500, 600, 700]
  }

  #getConsumptionClass() {
    const { eligible: eligibleClasses } =
      eligibilityConstants.consumptionClasses

    this.#data.consumptionClass = getRandomValuefromArray(eligibleClasses)
  }

  #getBillingModalities() {
    const { eligible: eligibleModalities } =
      eligibilityConstants.billingModalities

    this.#data.billingModality = getRandomValuefromArray(eligibleModalities)
  }

  #getConnectionType() {
    const { connectionTypes } = eligibilityConstants

    this.#data.connectionType = getRandomValuefromArray(connectionTypes)
  }

  #getConsumptionThreshould() {
    const connectionType = this.#data.connectionType
    return eligibilityConstants.consumptionThresholdsInKWh[connectionType]
  }

  #getAverageConsumption() {
    this.#data.averageConsumption = this.#getConsumptionThreshould() + 1
  }

  withInvalidConsumptionClass() {
    const { ineligible: ineligibleClasses } =
      eligibilityConstants.consumptionClasses

    this.#data.consumptionClass = getRandomValuefromArray(ineligibleClasses)

    return this
  }

  withInvalidBillingModality() {
    const { ineligible: ineligibleModalities } =
      eligibilityConstants.billingModalities

    this.#data.billingModality = getRandomValuefromArray(ineligibleModalities)

    return this
  }

  withInvalidAverageConsumption() {
    this.#data.averageConsumption = this.#getConsumptionThreshould() - 1

    return this
  }

  withConnectionType(connectionType) {
    this.#data.connectionType = connectionType

    return this
  }

  build() {
    return this.#data
  }
}

module.exports = { EletricBillBuilder }
