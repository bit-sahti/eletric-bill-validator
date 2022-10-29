const { generalConstants } = require('../../src/constants')
const { calculateAverage, calculateAnualCO2Economy } = require('../../src/helpers')

describe.only('Helpers test suite', () => {
    it('#calculateAverage -> should calculate the average from a list of numbers', () => {
        expect(calculateAverage([100, 100, 0, -100, 400])).toEqual(100)
    })

    it('#calculateCO2Economy -> should calculate the anual CO2 economy from average consumption', () => {
        const { carbonPer1000Kwh } = generalConstants

        expect(calculateAnualCO2Economy(1000)).toEqual(carbonPer1000Kwh * 12)
    })
})