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

const errorConstants = {
  internalErrorMessage:
    'Algo deu errado. Tente novamente mais tarde, ou entre em contato conosco se o erro persistir.',
  validationErrorMessage:
    'A validação da requisição falhou. Verifique os erros abaixo e tente novamente.'
}

const eligibilityConstants = {
  errors: {
    invalidConsumpionClass: 'Classe de consumo não aceita',
    invalidBillingModality: 'Modalidade tarifária não aceita',
    minimalConsumptionNotMet: 'Consumo muito baixo para tipo de conexão',
    invalidConsumptionSubclass: 'Subclasse de consumo não e aceita',
    mismatchingConsumptionClass: 'Subclasse de consumo não pertence a classe de consumo'
  },
  consumptionClasses: {
    eligible: ['comercial', 'residencial', 'industrial'],
    ineligible: ['poderPublico', 'rural']
  },
  consumptionSubclasses: {
    comercial: {
      eligible: [
        'administracaoCondominial',
        'comercial',
        'servicosDeTelecomunicacao',
        'servicosDeTransporte'
      ],
      ineligible: ['templosReligiosos']
    },
    industrial: {
      eligible: ['industrial'],
      ineligible: []
    },
    residencial: {
      eligible: ['residencial'],
      ineligible: ['baixaRenda']
    },
    poderPublico: {
      eligible: [],
      ineligible: ['poderPublicoEstadual', 'poderPublicoMunicipal']
    },
    rural: {
      eligible: [],
      ineligible: ['agropecuariaRural']
    }
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
  },
  calcVersion: '1'
}

module.exports = { generalConstants, errorConstants, eligibilityConstants }
