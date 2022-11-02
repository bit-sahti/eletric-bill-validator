const { InternalServiceError } = require("../../errors")

const buildApiError = error => {
    if (error.status) return error

    return new InternalServiceError(error)
}

const errorHandler = (error, request, response, next) => {
    console.error(error)

    if (!error.status) error = new InternalServiceError()

    const { type, message, status, validations } = error

    return response.status(status).json({
        type,
        message,
        ...(validations && { errors: validations })
    })
}

module.exports = errorHandler