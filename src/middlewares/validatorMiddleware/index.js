const { ValidationError } = require('../../errors')
const validators = require('../../validators')

const buildError = ({ errors, propertyName, propertyValue, propertySchema }) => {
  const { example, ...requirements } = propertySchema

  errors.push({
    field: propertyName,
    value: propertyValue,
    requirements,
    ...(example && { example })
  })
}

const isParamValid = (propertyValue, schema) => {
  const validator = validators[schema.type]

  if (validator) return validator({ [schema.type]: propertyValue, ...schema })

  return true
}

const validatorMiddleware = schema => {
  return (request, _, next) => {
    const errors = []
    const { body } = request

    for (const propertyName in schema) {
      const propertyValue = body[propertyName]
      const propertySchema = schema[propertyName]

      const hasMultipleSchemas = !!propertySchema.oneOf

      const errorParams = {
        errors,
        propertyName,
        propertyValue,
        propertySchema
      }

      if (propertySchema.required && !body[propertyName]) {
        buildError(errorParams)

        continue
      }

      if (hasMultipleSchemas) {
        const areAllInvalid = propertySchema.oneOf.every(
          schema => !isParamValid(propertyValue, schema)
        )

        if (areAllInvalid) buildError(errorParams)

        continue
      }

      if (!isParamValid(propertyValue, propertySchema)) buildError(errorParams)
    }

    if (errors.length) throw new ValidationError(errors)

    next()
  }
}

module.exports = validatorMiddleware
