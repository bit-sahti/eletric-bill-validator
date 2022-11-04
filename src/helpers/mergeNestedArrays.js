const mergeNestedArrays = category =>
  Object.values(category).flatMap(array => array)

module.exports = mergeNestedArrays
