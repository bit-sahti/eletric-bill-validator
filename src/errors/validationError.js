class ValidationError extends Error {
  constructor(validations) {
    super('Erro de validação')
    this.status = 400
    this.validations = validations
  }
}

module.exports = ValidationError
