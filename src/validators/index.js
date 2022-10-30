const isStringValid = ({ string, valuesEnum = [], pattern }) => {
  if (typeof string !== 'string') return false

  const isPatternMet = pattern && new RegExp(pattern).test(string)

  if (pattern && !isPatternMet) return false

  const isStringInEnum = valuesEnum.length && valuesEnum.some(value => string === value)

  if (valuesEnum && !isStringInEnum) return false

  return true
}

const isIntegerValid = ({ integer, minimal, maximal }) => {
    const convertedInteger = Number(integer)
    const convertedMinimal = Number(integer)
    const convertedMaximal = Number(maximal)

    const isValidNumber = number => !Number.isNaN(number)
    
    if (!isValidNumber(convertedInteger)) return false
    
    if (isValidNumber(convertedMinimal) && convertedInteger < minimal) return false
    
    if (isValidNumber(convertedMaximal) && convertedInteger > convertedMaximal) return false

    return true
}

const isArrayValid = ({ array, minItems, maxItems, items }) => {}

const isObjectValid = ({ additionalProperties, required, properties }) => {}

module.exports = { isStringValid, isIntegerValid, isArrayValid, isObjectValid }
