const { errorConstants } = require("../constants")

class ValidationError extends Error {
  constructor(validations) {
    super(errorConstants.validationErrorMessage)
    this.type = 'Erro de validação'
    this.status = 400
    this.validations = validations
  }
}

module.exports = ValidationError
