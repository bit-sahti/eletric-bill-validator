const { generalConstants } = require('../../src/constants')
const {
  calculateAverage,
  calculateAnualCO2Economy,
  mergeNestedArrays,
  enumOf
} = require('../../src/helpers')

describe('Helpers test suite', () => {
  it('#calculateAverage -> should calculate the average from a list of numbers', () => {
    expect(calculateAverage([100, 100, 0, -100, 400])).toEqual(100)
  })

  it('#calculateCO2Economy -> should calculate the anual CO2 economy from average consumption', () => {
    const { carbonPer1000Kwh } = generalConstants

    expect(calculateAnualCO2Economy(1000)).toEqual(carbonPer1000Kwh * 12)
  })

  it("#mergeNestedArrays -> should flatten an object's array properties into one array", () => {
    expect(mergeNestedArrays({ a: [1], b: [2] })).toStrictEqual([1, 2])
  })

  it('#enumOf -> should format an enum into an example object', () => {
    expect(enumOf(['one', 'two'])).toStrictEqual({
      type: 'string',
      valuesEnum: ['one', 'two'],
      example: 'one'
    })
  })
})
