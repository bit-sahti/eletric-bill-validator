const { EligibilityCheckHistory } = require('../model')

const saveHistory = async ({
  documentNumber,
  eligible,
  connectionType,
  consumptionClass,
  billingModality,
  averageConsumption,
  anualCO2Economy,
  consumptionHistory,
  calcVersion
}) => {
  try {
    const documentBody = {
      documentNumber,
      eligible,
      connectionType,
      consumptionClass,
      billingModality,
      averageConsumption,
      anualCO2Economy,
      consumptionHistory,
      calcVersion
    }

    const options = {
      upsert: true
    }

    await EligibilityCheckHistory.findOneAndUpdate(documentBody, {}, options)
  } catch (error) {
    console.error(error)
  }
}

module.exports = { saveHistory }
