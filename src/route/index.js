const { Router } = require('express')
const { eligibilityController } = require('../controller')

const elegibitilyRouter = Router()

elegibitilyRouter.post('/eligibility', eligibilityController)

module.exports = elegibitilyRouter