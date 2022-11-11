const { describe, it, expect } = require('@jest/globals')
const { eligibilityConstants } = require('../../src/constants')
const { runEligibityCheck } = require('../../src/service/runEligibilityCheck')
const { EletricBillBuilder } = require('./builder')

describe('Run Eligibility Checker test suite', () => {
  it('should identify eligible bills', () => {
    const bill = new EletricBillBuilder().build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: true,
      ineligibilityReasons: []
    })
  })

  it('should identify ineligible consumption classes', () => {
    const bill = new EletricBillBuilder().withInvalidConsumptionClass().build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: [eligibilityConstants.errors.invalidConsumpionClass]
    })
  })

  it('should identify ineligible consumption subclasses from within a category', () => {
    const bill = new EletricBillBuilder().withInvalidConsumptionSubclass().build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: [eligibilityConstants.errors.invalidConsumptionSubclass]
    })
  })

  it("should identify consumption subclasses that don't belong to a category", () => {
    const bill = new EletricBillBuilder().withMismatchingConsumptionSubclass().build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: expect.arrayContaining([eligibilityConstants.errors.mismatchingConsumptionClass])
    })
  })


  it('should identify ineligible billing modalities', () => {
    const bill = new EletricBillBuilder().withInvalidBillingModality().build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: expect.arrayContaining([eligibilityConstants.errors.invalidBillingModality])
    })
  })

  it('should identify ineligible consumption threshold for single phase connection', () => {
    const bill = new EletricBillBuilder()
      .withConnectionType('monofasico')
      .withInvalidAverageConsumption()
      .build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: [
        eligibilityConstants.errors.minimalConsumptionNotMet
      ]
    })
  })

  it('should identify ineligible consumption threshold for double phase connection', () => {
    const bill = new EletricBillBuilder()
      .withConnectionType('bifasico')
      .withInvalidAverageConsumption()
      .build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: [
        eligibilityConstants.errors.minimalConsumptionNotMet
      ]
    })
  })

  it('should identify ineligible consumption threshold for three-phase connection', () => {
    const bill = new EletricBillBuilder()
      .withConnectionType('trifasico')
      .withInvalidAverageConsumption()
      .build()

    const result = runEligibityCheck(bill)

    expect(result).toStrictEqual({
      eligible: false,
      ineligibilityReasons: [
        eligibilityConstants.errors.minimalConsumptionNotMet
      ]
    })
  })
})
