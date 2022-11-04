const { InternalServiceError } = require("../../errors")

const errorHandler = (error, request, response, next) => {
    try {
        console.error(error)

        if (!error.status) error = new InternalServiceError()

        const { type, message, status, validations } = error

        return response.status(status).json({
            type,
            message,
            ...(validations && { errors: validations })
        })
    } catch (error) {
        response.send('oop')
    }
}

module.exports = errorHandler