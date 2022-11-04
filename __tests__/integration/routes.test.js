const request = require('supertest')
const { describe, it, expect } = require('@jest/globals')
const { app } = require('../../src/app')
const { errorConstants } = require('../../src/constants')
const mongoose = require('mongoose')

describe.only('Routes integration test suite', () => {
  describe('Get root route', () => {
    it('should redirect to API docs', async () => {
      const { status, headers } = await request(app).get('/')

      expect(status).toBe(302)
      expect(headers.location).toBe('/docs')
    })
  })

  describe('Eligibility post route', () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.TEST_MONGO_URI)
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })

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
            3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941,
            4597
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
})
