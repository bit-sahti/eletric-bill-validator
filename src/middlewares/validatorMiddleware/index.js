const { ValidationError } = require("../../errors")
const validators = require("../../validators")

const validatorMiddleware = schema => {
    return (request, _, next) => {
        const errors = []
        const { body } = request
        const buildError = ({ propertyName, propertyValue, propertySchema }) => errors.push({
            field: propertyName,
            value: propertyValue,
            requirements: propertySchema
        })

        for (const propertyName in schema) {
            const propertyValue = body[propertyName]
            const propertySchema = schema[propertyName]
            const hasMultipleSchemas = !!propertySchema.oneOf
            const errorParams = { propertyName, propertyValue, propertySchema }

            const isParamValid = (schema) => {
                const validator = validators[schema.type]
                
                if (validator) return validator({ [schema.type]: propertyValue, ...schema })

                return true
            }

            if (propertySchema.required && !body.hasOwnProperty(propertyName)) {
                buildError(errorParams)

                continue
            }
            
            if (hasMultipleSchemas) {
                const areAllInvalid = propertySchema.oneOf.every(schema => isParamValid(schema))

                if (areAllInvalid) buildError(errorParams)

                continue
            }
            

            if (!isParamValid(propertySchema)) {
                buildError(errorParams)
            }
        }

        if (errors.length) throw new ValidationError(errors)

        next()
    }
}

module.exports = validatorMiddleware