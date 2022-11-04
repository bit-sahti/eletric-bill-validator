// copied and modified from example code
const enumOf = values => ({
  type: typeof values[0],
  valuesEnum: values,
  example: values[0]
})

module.exports = enumOf
