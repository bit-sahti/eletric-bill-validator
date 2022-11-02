const { app } = require('../../src/app')
const request = require('supertest')
const { describe, it, expect } = require('@jest/globals')
const { errorConstants } = require('../../src/constants')

describe('Eligibility Route test suite', () => {
  const route = '/eligibility'

  it('should return a validation error if the request schema is not followed', async () => {
    const { status, body } = await request(app)
      .post(route)
      .send({
        tipoDeConexao: 'um',
        classeDeConsumo: 'dois',
        modalidadeTarifaria: 'três',
        historicoDeConsumo: [-1, 10000]
      })

    expect(status).toBe(400)
    expect(body.type).toBe('Erro de validação')
    expect(body.message).toBe(errorConstants.validationErrorMessage)
    expect(body.errors.length).toBe(5)
  })

  it('should return the CO2 economy when client is eligible', async () => {
    const { status, body } = await request(app)
      .post(route)
      .send({
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597
        ]
      })

    expect(status).toBe(200)
    expect(body).toStrictEqual({
      elegivel: true,
      economiaAnualDeCO2: 5553.24
    })
  })

  it('should return the inegibility reasons when client is ineligible', async () => {
    const { status, body } = await request(app)
      .post(route)
      .send({
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'rural',
        modalidadeTarifaria: 'verde',
        historicoDeConsumo: [
          3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160
        ]
      })

    expect(status).toBe(200)
    expect(body).toStrictEqual({
      elegivel: false,
      razoesInelegibilidade: [
        'Classe de consumo não aceita',
        'Modalidade tarifária não aceita'
      ]
    })
  })
})
