const { describe, it, expect } = require('@jest/globals')
const { validatorMiddleware } = require('../../src/middlewares')
const { mockExpress } = require('./utils')
const { validBody, invalidBody, mockedSchema, expectedErrors } = require('./mocks/validatorMiddlewareTests')
const { errorConstants } = require('../../src/constants')

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
    expect(() => validatorMiddleware(schema)(request, response, next)).toThrowError(errorConstants.validationErrorMessage)
  })

  it("should throw if a property doesn't meet the provided schema", () => {
    const schema = {
      numeroDeDocumento: {
        type: 'string',
        required: true,
        pattern: '\\W'
      }
    }

    request.body = {
      numeroDeDocumento: 'abc'
    }

    expect(next).not.toHaveBeenCalled()
    expect(() => validatorMiddleware(schema)(request, response, next)).toThrowError(errorConstants.validationErrorMessage)
  })

  it('should throw a validation error listing the failed validations', () => {
    request.body = invalidBody

    try {
      validatorMiddleware(mockedSchema)(request, response, next)

      expect(next).not.toHaveBeenCalled()
    } catch (error) {
      // console.error(error)
      expect(error.validations).toStrictEqual(expectedErrors)
    }
  })
})
