const { describe, it, expect } = require('@jest/globals')
const { validatorMiddleware, errorHandler } = require('../../src/middlewares')
const { mockExpress } = require('./utils')
const {
  validBody,
  invalidBody,
  mockedSchema,
  expectedErrors
} = require('./mocks/validatorMiddlewareTests')
const { errorConstants } = require('../../src/constants')
const { ValidationError } = require('../../src/errors')
const InternalServiceError = require('../../src/errors/internalServiceError')

describe('Middlewares test suite', () => {
  let request, response, next

  beforeEach(() => {
    const express = mockExpress()

    request = express.request
    response = express.response
    next = express.next
  })

  describe('Validator Middleware test suite', () => {
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
      expect(() =>
        validatorMiddleware(schema)(request, response, next)
      ).toThrowError(errorConstants.validationErrorMessage)
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
      expect(() =>
        validatorMiddleware(schema)(request, response, next)
      ).toThrowError(errorConstants.validationErrorMessage)
    })

    it('should throw a validation error listing the failed validations', () => {
      request.body = invalidBody

      try {
        validatorMiddleware(mockedSchema)(request, response, next)

        expect(next).not.toHaveBeenCalled()
      } catch (error) {
        expect(error.validations).toStrictEqual(expectedErrors)
      }
    })
  })

  describe('Error Handler test suite', () => {
    it('should format the error and send a response', () => {
      const error = new ValidationError([])
      errorHandler(error, request, response, next)

      expect(response.status).toHaveBeenCalledWith(400)
      expect(response.json).toHaveBeenCalledWith({
        type: error.type,
        message: error.message,
        errors: error.validations
      })
    })


  it('should not send the errors property if it is undefined', () => {
    const error = new ValidationError()
    
    errorHandler(error, request, response, next)
    
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({
      type: error.type,
      message: error.message,
      errors: error.validations
    })
  })

  it('should return an InternalServiceError if for unexpected errors', () => {
    const error = new TypeError()
    const expectedError = new InternalServiceError()
    
    errorHandler(error, request, response, next)

    expect(response.status).toHaveBeenCalledWith(500)
    expect(response.json).toHaveBeenCalledWith({
      type: expectedError.type,
      message: expectedError.message
    })
  })
  })
})
