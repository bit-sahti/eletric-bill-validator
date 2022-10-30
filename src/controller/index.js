const { calculateAverage, calculateAnualCO2Economy } = require('../helpers')
const { eligibilityService } = require('../service')

const eligibilityController = (request, response) => {
  const {
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo
  } = request.body

  const averageConsumption = calculateAverage(historicoDeConsumo)

  const { eligible, ineligibilityReasons } = eligibilityService({
    averageConsumption,
    connectionType: tipoDeConexao,
    consumptionClass: classeDeConsumo,
    billingModality: modalidadeTarifaria
  })

  const apiResponse = {
    elegivel: eligible,
    ...(!eligible && { razoesInelegibilidade: ineligibilityReasons }),
    ...(eligible && { economiaAnualDeCO2: calculateAnualCO2Economy(averageConsumption) })
  }

  response.status(200).json(apiResponse)
}

module.exports = { eligibilityController }
