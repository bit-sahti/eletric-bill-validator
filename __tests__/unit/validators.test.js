const { describe, it, expect } = require("@jest/globals")
const { isStringValid, isArrayValid, isObjectValid } = require("../../src/validators")

describe('Validators test suite', () => {
    describe('isStringValid test suite', () => {
        it.todo('should return false if value is not a string')
        it.todo('should return false if value does not meet pattern')
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