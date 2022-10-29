const { eligibilityService } = require('../service')

const eligibilityController = (request, response) => {
  const result = eligibilityService(request.body)

  response.json(result)
}

module.exports = { eligibilityController }
