const elegibilityConstants = {
  errors: {
    invalidConsumpionClass: 'Classe de consumo não aceita',
    invalidBillingModality: 'Modalidade tarifária não aceita',
    minimalConsumptionNotMet: 'Consumo muito baixo para tipo de conexão'
  },
  consumptionClasses: ['Comercial', 'Residencial', 'Industrial'],
  billingModalities: ['Convencional', 'Branca'],
  consumptionThresholdsInKWh: {
    singlePhaseConextion: 400,
    doublePhaseConextion: 500,
    threePhaseConextion: 750
  }
}

module.exports = { elegibilityConstants }