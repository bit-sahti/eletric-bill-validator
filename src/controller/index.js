const { elegibilityService } = require('../service')

const elegibilityController = (request, response) => {
  const result = elegibilityService(request.body)

  response.json(result)
}

module.exports = { elegibilityController }
