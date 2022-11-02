const validators = {
  string: isStringValid,
  integer: isIntegerValid,
  array: isArrayValid
}

function isStringValid({ string, valuesEnum = [], pattern }) {
  if (typeof string !== 'string') return false

  const isPatternMet = pattern && new RegExp(pattern).test(string)

  if (pattern && !isPatternMet) return false

  const shouldMatchEnum = !!valuesEnum.length
  const isStringInEnum = shouldMatchEnum && valuesEnum.some(value => string === value)

  if (shouldMatchEnum && !isStringInEnum) return false

  return true
}

function isValidNumber(value) {
  return !Number.isNaN(Number(value))
}

function isIntegerValid({ integer, minimal, maximal }) {
    if (!isValidNumber(integer)) return false

    if (isValidNumber(minimal) && integer < minimal) return false
    
    if (isValidNumber(maximal) && integer > maximal) return false
    
    return true
}

function isArrayValid({ array, minItems, maxItems, itemsSchema }) {
  if (!Array.isArray(array)) return false

  if (isValidNumber(minItems) && array.length < minItems) return false

  if (isValidNumber(maxItems) && array.length > maxItems) return false

  const validateItem =  validators[itemsSchema?.type]
  const isThereAnInvalidItem = array => array.some(value => !validateItem({ [itemsSchema.type]: value, ...itemsSchema }))

  if (itemsSchema && validateItem && isThereAnInvalidItem(array)) return false

  return true
}

module.exports = validators
