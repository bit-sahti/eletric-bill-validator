const elegibilityConstants = {
  errors: {
    invalidConsumpionClass: 'Classe de consumo não aceita',
    invalidBillingModality: 'Modalidade tarifária não aceita',
    minimalConsumptionNotMet: 'Consumo muito baixo para tipo de conexão'
  },
  consumptionClasses: {
    eligible: ['Comercial', 'Residencial', 'Industrial'],
    ineligible: ['Poder Público', 'Rural']
  },
  billingModalities: {
    eligible: ['Convencional', 'Branca'],
    ineligible: ['Azul', 'Verde']
  },
  connectionTypes: ['monofasico', 'bifasico', 'trifasico'],
  consumptionThresholdsInKWh: {
    monofasico: 400,
    bifasico: 500,
    trifasico: 750
  }
}

module.exports = { elegibilityConstants }