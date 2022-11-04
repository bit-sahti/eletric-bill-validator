const { eligibilityService } = require('../service')

const eligibilityController = async (request, response, next) => {
  console.log('Starting eligibility route. Received body: ', JSON.stringify(request.body))

  try {
    const {
      numeroDoDocumento,
      tipoDeConexao,
      classeDeConsumo,
      modalidadeTarifaria,
      historicoDeConsumo
    } = request.body

    const { eligible, ineligibilityReasons, anualCO2Economy } =
      await eligibilityService({
        documentNumber: numeroDoDocumento,
        consumptionHistory: historicoDeConsumo,
        connectionType: tipoDeConexao,
        consumptionClass: classeDeConsumo,
        billingModality: modalidadeTarifaria
      })

    const apiResponse = {
      elegivel: eligible,
      ...(!eligible && { razoesInelegibilidade: ineligibilityReasons }),
      ...(eligible && { economiaAnualDeCO2: anualCO2Economy })
    }

    console.log('Sending response: ', JSON.stringify(apiResponse))
    
    response.status(200).json(apiResponse)
  } catch (error) {
    next(error)
  }
}

module.exports = { eligibilityController }
