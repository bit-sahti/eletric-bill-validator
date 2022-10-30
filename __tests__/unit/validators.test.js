const { describe, it, expect } = require("@jest/globals")
const { isStringValid, isIntegerValid, isArrayValid, isObjectValid } = require("../../src/validators")

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

    describe('isIntegerValid test suite', () => {
        it('should return true if integer meets the requirements', () => {
            expect(isIntegerValid({ integer: 1, minimal: 1, maximal: 1 })).toBe(true)
        })

        it('should return true if value is integer and minal and maximal are not specified', () => {
            expect(isIntegerValid({ integer: 1 })).toBe(true)
        })

        it('should work if parameters are stringified', () => {
            expect(isIntegerValid({ integer: '100', minimal: '100', maximal: '105' })).toBe(true)
        })

        it('should return false if value cannot be converted to number', () => {
            expect(isIntegerValid({ integer: undefined })).toBe(false)
        })

        it('should return false if value is smaller than minimal', () => {
            expect(isIntegerValid({ integer: 1, minimal: 2 })).toBe(false)
        })
        
        it('should return false if value is bigger than maximal', () => {
            expect(isIntegerValid({ integer: 4, maximal: 3 })).toBe(false)
        })
    })

    describe('isArrayValid test suite', () => {
        it('should return true if all criteria are met', () => {
            expect(isArrayValid({ array: [1, 3], minItems: 2, maxItems: 10 })).toBe(true)
        })

        it('should return false if value is not an array', () => {
            expect(isArrayValid({ array: {} })).toBe(false)
        })

        it('should return false if array has fewer items than minimal', () => {
            expect(isArrayValid({ array: [1], minItems: 2 })).toBe(false)
        })

        it('should return false if array has more items than maximal', () => {
            expect(isArrayValid({ array: [1, 3], maxItems: 1 })).toBe(false)
        })

        it("should return false if one or more items is a string and don't meet requirements", () => {
            expect(isArrayValid({ array: ['as', '12', 'dc'], itemsSchema: {
                type: 'string',
                pattern: '\\D'
            }})).toBe(false)
        })

        it("should return false if one or more items is a integer and don't meet requirements", () => {
            expect(isArrayValid({ array: ['10', '3'], itemsSchema: {
                type: 'integer',
                minimal: '4',
                maximal: '10'
            }})).toBe(false)
        })
    })

    describe('isObjectValid test suite', () => {
        it.todo('should return false if value is not an object')
        it.todo('should return false if value has unlisted properties and additionalProperties is false')
        it.todo("should return false if value doesn't have the required properties")
        it.todo("should return false if one or more properties don't meet requirements")
    })
})