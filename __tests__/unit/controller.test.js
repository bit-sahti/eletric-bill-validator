const { describe, expect, it } = require('@jest/globals')
const { eligibilityConstants } = require('../../src/constants')
const { eligibilityController } = require('../../src/controller')
const {
  calculateAverage,
  calculateAnualCO2Economy
} = require('../../src/helpers')
const { eligibilityService } = require('../../src/service')
const { mockExpress } = require('./utils')

jest.mock('../../src/service')
jest.mock('../../src/helpers')

describe('Elegibility Controller test suite', () => {
  let request, response

  beforeEach(() => {
    const express = mockExpress()
    
    request = express.request
    response = express.response

    request.body = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [1000, 1000, 1000]
    }
  })

  it('should get the average consumption and pass it to the service', () => {
    const mockedAverageConsumption = 1000
    calculateAverage.mockReturnValue(mockedAverageConsumption)
    eligibilityService.mockReturnValue({})

    eligibilityController(request, response)

    const {
      tipoDeConexao,
      classeDeConsumo,
      modalidadeTarifaria,
      historicoDeConsumo
    } = request.body

    expect(calculateAverage).toHaveBeenCalledWith(historicoDeConsumo)

    expect(eligibilityService).toHaveBeenCalledWith({
      connectionType: tipoDeConexao,
      consumptionClass: classeDeConsumo,
      billingModality: modalidadeTarifaria,
      averageConsumption: mockedAverageConsumption
    })
  })

  it('should get and return the CO2 economy projection if client is eligible', () => {
    const mockedAverageConsumption = 1000
    const mockedCO2Economy = 84

    calculateAverage.mockReturnValue(mockedAverageConsumption)
    eligibilityService.mockReturnValue({
      eligible: true,
      ineligibilityReasons: []
    })
    calculateAnualCO2Economy.mockReturnValue(mockedCO2Economy)

    eligibilityController(request, response)

    expect(calculateAnualCO2Economy).toHaveBeenCalledWith(
      mockedAverageConsumption
    )
    expect(response.json).toHaveBeenCalledWith({
      elegivel: true,
      economiaAnualDeCO2: mockedCO2Economy
    })
  })

  it('should get and return the ineligibility reasons if client is ineligible', () => {
    const ineligibilityReasons = eligibilityConstants.errors

    eligibilityService.mockReturnValue({
      eligible: false,
      ineligibilityReasons
    })

    eligibilityController(request, response)

    expect(calculateAnualCO2Economy).not.toHaveBeenCalled()
    expect(response.json).toHaveBeenCalledWith({
      elegivel: false,
      razoesInelegibilidade: ineligibilityReasons
    })
  })
})
