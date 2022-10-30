const isStringValid = ({ string, valuesEnum = [], pattern }) => {
  if (typeof string !== 'string') return false

  const isPatternMet = pattern && new RegExp(pattern).test(string)

  if (pattern && !isPatternMet) return false

  const isStringInEnum = valuesEnum.length && valuesEnum.some(value => string === value)

  if (valuesEnum && !isStringInEnum) return false

  return true
}

const isIntegerValid = ({ integer, minimal, maximal }) => {}

const isArrayValid = ({ array, minItems, maxItems, items }) => {}

const isObjectValid = ({ additionalProperties, required, properties }) => {}

module.exports = { isStringValid, isArrayValid, isObjectValid }
