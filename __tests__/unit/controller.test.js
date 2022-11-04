const { describe, expect, it } = require('@jest/globals')
const { eligibilityConstants } = require('../../src/constants')
const { eligibilityController } = require('../../src/controller')
const {
  calculateAverage,
  calculateAnualCO2Economy
} = require('../../src/helpers')
const { eligibilityService } = require('../../src/service')
const { mockExpress } = require('./utils')

jest.mock('../../src/service/index.js')
jest.mock('../../src/helpers')

describe.only('Elegibility Controller test suite', () => {
  let request, response, next

  beforeEach(() => {
    const express = mockExpress()

    request = express.request
    response = express.response
    next = express.next

    request.body = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [1000, 1000, 1000]
    }
  })

  // it('should get the average consumption and pass it to the service', () => {
  //   const mockedAverageConsumption = 1000
  //   calculateAverage.mockReturnValue(mockedAverageConsumption)
  //   eligibilityService.mockReturnValue({})

  //   eligibilityController(request, response)

  //   const {
  //     tipoDeConexao,
  //     classeDeConsumo,
  //     modalidadeTarifaria,
  //     historicoDeConsumo
  //   } = request.body

  //   expect(calculateAverage).toHaveBeenCalledWith(historicoDeConsumo)

  //   expect(eligibilityService).toHaveBeenCalledWith({
  //     connectionType: tipoDeConexao,
  //     consumptionClass: classeDeConsumo,
  //     billingModality: modalidadeTarifaria,
  //     averageConsumption: mockedAverageConsumption
  //   })
  // })

  // it('should get and return the CO2 economy projection if client is eligible', () => {
  //   const mockedAverageConsumption = 1000
  //   const mockedCO2Economy = 84

  //   calculateAverage.mockReturnValue(mockedAverageConsumption)
  //   eligibilityService.mockReturnValue({
  //     eligible: true,
  //     ineligibilityReasons: []
  //   })
  //   calculateAnualCO2Economy.mockReturnValue(mockedCO2Economy)

  //   eligibilityController(request, response)

  //   expect(calculateAnualCO2Economy).toHaveBeenCalledWith(
  //     mockedAverageConsumption
  //   )
  //   expect(response.json).toHaveBeenCalledWith({
  //     elegivel: true,
  //     economiaAnualDeCO2: mockedCO2Economy
  //   })
  // })

  it('should run the service and return the CO2 economy if client is elibible', async () => {
    const anualCO2Economy = 500
    const {
      numeroDoDocumento,
      tipoDeConexao,
      classeDeConsumo,
      modalidadeTarifaria,
      historicoDeConsumo
    } = request.body

    eligibilityService.mockResolvedValue({
      eligible: true,
      anualCO2Economy,
      ineligibilityReasons: []
    })

    await eligibilityController(request, response, next)

    expect(eligibilityService).toHaveBeenCalledWith({
      documentNumber: numeroDoDocumento,
      connectionType: tipoDeConexao,
      consumptionClass: classeDeConsumo,
      billingModality: modalidadeTarifaria,
      consumptionHistory: historicoDeConsumo
    })

    expect(response.json).toHaveBeenCalledWith({
      elegivel: true,
      economiaAnualDeCO2: anualCO2Economy
    })
  })

  it('should run the service and return the ineligibility reasons if client is ineligible', async () => {
    const ineligibilityReasons = eligibilityConstants.errors
    const {
      numeroDoDocumento,
      tipoDeConexao,
      classeDeConsumo,
      modalidadeTarifaria,
      historicoDeConsumo
    } = request.body

    eligibilityService.mockResolvedValue({
      eligible: false,
      ineligibilityReasons
    })

    await eligibilityController(request, response, next)

    expect(eligibilityService).toHaveBeenCalledWith({
      documentNumber: numeroDoDocumento,
      connectionType: tipoDeConexao,
      consumptionClass: classeDeConsumo,
      billingModality: modalidadeTarifaria,
      consumptionHistory: historicoDeConsumo
    })

    expect(response.json).toHaveBeenCalledWith({
      elegivel: false,
      razoesInelegibilidade: ineligibilityReasons
    })
  })
})
