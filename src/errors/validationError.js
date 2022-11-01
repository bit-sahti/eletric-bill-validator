class ValidationError extends Error {
  constructor(errors) {
    super('Erro de validação')
    this.status = 400
    this.errors = errors
  }
}

module.exports = ValidationError
