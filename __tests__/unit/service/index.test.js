const { describe, it, expect } = require('@jest/globals')
const {
  calculateAverage,
  calculateAnualCO2Economy
} = require('../../../src/helpers')
const { EligibilityCheckHistory } = require('../../../src/model')
const { eligibilityService } = require('../../../src/service')
const {
  runEligibityCheck
} = require('../../../src/service/runEligibilityCheck')
const { saveHistory } = require('../../../src/service/saveHistory')
const { EletricBillBuilder } = require('../builder')

jest.mock('../../../src/model')
jest.mock('../../../src/helpers/calculateAverage.js')
jest.mock('../../../src/helpers/calculateAnualCO2Economy.js')
jest.mock('../../../src/service/runEligibilityCheck')
jest.mock('../../../src/service/saveHistory.js')

describe.only('Eligibility Service test suite', () => {
  it('should calculate the average consumption and run elibility check', async () => {
    const bill = new EletricBillBuilder().build()

    const mockedAverageConsumption = 1000

    calculateAverage.mockReturnValue(mockedAverageConsumption)
    runEligibityCheck.mockReturnValue({})

    await eligibilityService(bill)

    expect(calculateAverage).toHaveBeenCalledWith(bill.consumptionHistory)
    expect(runEligibityCheck).toHaveBeenCalledWith({
      averageConsumption: mockedAverageConsumption,
      connectionType: bill.connectionType,
      consumptionClass: bill.consumptionClass,
      billingModality: bill.billingModality
    })
  })

  it('should calculate CO2 economy if client is eligible', async () => {
    const bill = new EletricBillBuilder().build()

    const mockedAverageConsumption = 1000

    calculateAverage.mockReturnValue(mockedAverageConsumption)
    runEligibityCheck.mockReturnValue({
      eligible: true
    })

    await eligibilityService(bill)

    expect(calculateAnualCO2Economy).toHaveBeenCalledWith(
      mockedAverageConsumption
    )
  })

  it('should not calculate CO2 economy if client is not eligible', async () => {
    const bill = new EletricBillBuilder().build()

    const mockedAverageConsumption = 1000

    calculateAverage.mockReturnValue(mockedAverageConsumption)
    runEligibityCheck.mockReturnValue({
      eligible: false
    })

    await eligibilityService(bill)

    expect(calculateAnualCO2Economy).not.toHaveBeenCalled()
  })

  it('should save the check history', async () => {
    const bill = new EletricBillBuilder().build()
    
    const mockedAverageConsumption = 1000

    calculateAverage.mockReturnValue(mockedAverageConsumption)

    runEligibityCheck.mockReturnValue({
      eligible: false
    })

    await eligibilityService(bill)

    expect(saveHistory).toHaveBeenCalledWith({
      documentNumber: bill.documentNumber,
      eligible: false,
      connectionType: bill.connectionType,
      consumptionClass: bill.consumptionClass,
      billingModality: bill.billingModality,
      averageConsumption: mockedAverageConsumption,
      anualCO2Economy: null,
      consumptionHistory: bill.consumptionHistory,
      calcVersion: '1'
    })
  })

  it('should return the eligibility data', async () => {
    const bill = new EletricBillBuilder().build()

    const mockedAnualEconomy = 84
    const elibilityCheck = {
      eligible: true,
      ineligibilityReasons: []
    }

    calculateAnualCO2Economy.mockReturnValue(mockedAnualEconomy)

    runEligibityCheck.mockReturnValue(elibilityCheck)

    const result = await eligibilityService(bill)

    expect(result).toStrictEqual({
      eligible: elibilityCheck.eligible,
      ineligibilityReasons: elibilityCheck.ineligibilityReasons,
      anualCO2Economy: mockedAnualEconomy
    })
  })
})
