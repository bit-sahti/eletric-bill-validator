const { eligibilityConstants } = require('../../../src/constants')
const { getRandomValuefromArray, mergeNestedArrays } = require('../../../src/helpers')

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
    this.#getConsumptionSubclass()
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

  #getConsumptionSubclass() {
    const consumptionClass = this.#data.consumptionClass
    const eligibleSubclasses =
      eligibilityConstants.consumptionSubclasses[consumptionClass].eligible

    this.#data.consumptionSubclass = getRandomValuefromArray(eligibleSubclasses)
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

  withInvalidConsumptionSubclass() {
    const consumptionClass = this.#data.consumptionClass
    const ineligibleSubclasses =
      eligibilityConstants.consumptionSubclasses[consumptionClass].ineligible

    this.#data.consumptionSubclass =
      getRandomValuefromArray(ineligibleSubclasses)

      return this
  }

  withMismatchingConsumptionSubclass() {
    const consumptionClass = this.#data.consumptionClass
    const otherConsumptionClasses = Object.keys(eligibilityConstants.consumptionSubclasses).filter(otherConsumptionClass => otherConsumptionClass !== consumptionClass)

    const randomConsumptionClass = getRandomValuefromArray(otherConsumptionClasses)

    const randomConsumptionClassSubclasses = mergeNestedArrays(eligibilityConstants.consumptionSubclasses[randomConsumptionClass])

    this.#data.consumptionSubclass =  getRandomValuefromArray(randomConsumptionClassSubclasses)

    return this
  }

  build() {
    return this.#data
  }
}

module.exports = { EletricBillBuilder }
