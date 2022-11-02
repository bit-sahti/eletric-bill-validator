const generalConstants = {
  carbonPer1000Kwh: 84,
  validations: {
    cpf: {
      type: 'string',
      pattern: '^\\d{11}$',
      example: '21554495008'
    },
    cnpj: {
      type: 'string',
      pattern: '^\\d{14}$',
      example: '33400689000109'
    }
  }
}

const eligibilityConstants = {
  errors: {
    invalidConsumpionClass: 'Classe de consumo não aceita',
    invalidBillingModality: 'Modalidade tarifária não aceita',
    minimalConsumptionNotMet: 'Consumo muito baixo para tipo de conexão'
  },
  consumptionClasses: {
    eligible: ['comercial', 'residencial', 'industrial'],
    ineligible: ['poderPublico', 'rural']
  },
  billingModalities: {
    eligible: ['convencional', 'branca'],
    ineligible: ['azul', 'verde']
  },
  connectionTypes: ['monofasico', 'bifasico', 'trifasico'],
  consumptionThresholdsInKWh: {
    monofasico: 400,
    bifasico: 500,
    trifasico: 750
  }
}

module.exports = { generalConstants, eligibilityConstants }
