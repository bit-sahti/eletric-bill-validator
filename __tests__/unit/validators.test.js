const { describe, it, expect } = require("@jest/globals")
const { isStringValid, isArrayValid, isObjectValid } = require("../../src/validators")

describe('Validators test suite', () => {
    describe('isStringValid test suite', () => {
        it('should return true if value meets requirements', ()  => {
            expect(isStringValid({ string: 'abc', pattern: '\\w', valuesEnum: ['adc', 'abc'] })).toBe(true)
        })

        it('should return false if value is not a string', ()  => {
            expect(isStringValid({ string: 1 })).toBe(false)
        })

        it('should return false if value does not meet pattern', () => {
            expect(isStringValid({ string: 'abc', pattern: '\\d' })).toBe(false)
        })

        it('should return false if value does is not one of the provided enum', () => {
            expect(isStringValid({ string: 'abc', valuesEnum: ['a', 'b'] })).toBe(false)
        })
    })

    describe('isStringInteger test suite', () => {
        it.todo('should return false if value is not a number')
        it.todo('should return false if value is smaller than minimal')
        it.todo('should return false if value is bigger than maximal')
    })

    describe('isArrayValid test suite', () => {
        it.todo('should return false if value is not an array')
        it.todo('should return false if array has fewer items than minimal')
        it.todo('should return false if array has more items than maximal')
        it.todo("should return false if one or more items don't meet requirements")
    })

    describe('isObjectValid test suite', () => {
        it.todo('should return false if value is not an object')
        it.todo('should return false if value has unlisted properties and additionalProperties is false')
        it.todo("should return false if value doesn't have the required properties")
        it.todo("should return false if one or more properties don't meet requirements")
    })
})