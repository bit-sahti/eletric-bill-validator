const generalConstants = {
  carbonPer1000Kwh: 84
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