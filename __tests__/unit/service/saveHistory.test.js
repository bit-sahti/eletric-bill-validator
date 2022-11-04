const { describe, it, expect } = require('@jest/globals')
const { EligibilityCheckHistory } = require('../../../src/model')
const { saveHistory } = require('../../../src/service/saveHistory')
const { EletricBillBuilder } = require('../builder')

jest.mock('../../../src/model')

describe('Save Elibility History test suite', () => {
  it('should upsert the data to the database and return the result', async () => {
    const billData = new EletricBillBuilder().build()

    const body = {
      ...billData,
      eligible: true,
      anualCO2Economy: 500,
      calcVersion: '1'
    }

    await saveHistory(body)

    expect(EligibilityCheckHistory.findOneAndUpdate).toHaveBeenCalledWith(body, {}, { upsert: true })
  })
})
