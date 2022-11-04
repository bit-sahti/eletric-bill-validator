const { errorConstants } = require('../constants')

class InternalServiceError extends Error {
  constructor() {
    super(errorConstants.internalErrorMessage)
    this.type = 'Erro interno'
    this.status = 500
  }
}

module.exports = InternalServiceError
