const mongoose = require('mongoose')
const { eligibilityConstants } = require('../constants')
const { mergeNestedArrays } = require('../helpers')

const EligibilityCheckHistorySchema = new mongoose.Schema({
    documentNumber: {
        type: String,
        required: true,
        match: /^\d{11}$|^\d{14}$/
    },
    eligible: {
        type: Boolean,
        required: true
    },
    connectionType: {
        type: String,
        required: true,
        enum: eligibilityConstants.connectionTypes
    },
    consumptionClass: {
        type: String,
        required: true,
        enum: mergeNestedArrays(eligibilityConstants.consumptionClasses)
    },
    billingModality: {
        type: String,
        required: true,
        enum: mergeNestedArrays(eligibilityConstants.billingModalities)
    },
    averageConsumption: {
        type: Number,
        required: true
    },
    anualCO2Economy: {
        type: Number,
        required: false
    },
    consumptionHistory: {
        type: [{
            type: Number,
            required: true,
            min: 0,
            max: 9999
        }]
    },
    calcVersion: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const EligibilityCheckHistory = new mongoose.model('EligibilityCheckHistory', EligibilityCheckHistorySchema, 'EligibilityCheckHistories')

module.exports = { EligibilityCheckHistory }