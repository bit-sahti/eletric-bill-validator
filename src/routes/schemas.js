const { generalConstants, eligibilityConstants } = require('../constants')
const { enumOf, mergeNestedArrays } = require('../helpers')

const { cpf, cnpj } = generalConstants.validations
const { consumptionClasses, billingModalities, connectionTypes } =  eligibilityConstants

const eligibilitySchema = {
  numeroDoDocumento: { required: true, oneOf: [cpf, cnpj] },
  tipoDeConexao: enumOf(connectionTypes),
  classeDeConsumo: enumOf(mergeNestedArrays(consumptionClasses)),
  modalidadeTarifaria: enumOf(mergeNestedArrays(billingModalities)),
  historicoDeConsumo: {
    type: 'array',
    minItems: 3,
    maxItems: 12,
    itemsSchema: {
      type: 'integer',
      minimal: 0,
      maximal: 9999
    }
  }
}

module.exports = {
  eligibilitySchema
}
