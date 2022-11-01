const { describe, it, expect } = require('@jest/globals')
const { validatorMiddleware } = require('../../src/middlewares')
const { ValidationError } = require('../../src/errors')
const { mockExpress } = require('./utils')
const { validBody, invalidBody, mockedSchema, expectedErrors } = require('./mocks/invalidParametersExample')

describe('Middlewares test suite', () => {
  let request, response, next

  beforeEach(() => {
    const express = mockExpress()

    request = express.request
    response = express.response
    next = express.next
  })

  it('should call next if body is valid', () => {
    request.body = validBody

    validatorMiddleware(mockedSchema)(request, response, next)

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should throw if a required property is missing', () => {
    const schema = {
      numeroDeDocumento: {
        required: true
      },
      tipoDeConexao: {
        required: true
      }
    }

    request.body = {
      numeroDeDocumento: '11111111111'
    }

    expect(next).not.toHaveBeenCalled()
    expect(validatorMiddleware(schema)(request, response, next)).toThrow()
  })

  it("should throw if a property doesn't meet the provided schema", () => {
    const schema = {
      numeroDeDocumento: {
        required: true
      }
    }

    request.body = {
      numeroDeDocumento: 'abc'
    }

    expect(next).not.toHaveBeenCalled()
    expect(validatorMiddleware(schema)(request, response, next)).toThrow()
  })

  it('should throw a validation error listing the failed validations', () => {
    request.body = invalidBody

    expect(validatorMiddleware(mockedSchema)(request, response, next)).toThrowError(new ValidationError(expectedErrors))
  })
})
