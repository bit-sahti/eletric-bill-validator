const { Router } = require('express')
const { eligibilityController } = require('../controller')
const { validatorMiddleware } = require('../middlewares')
const { eligibilitySchema } = require('./schemas')

const elegibitilyRouter = Router()

elegibitilyRouter.post('/eligibility', validatorMiddleware(eligibilitySchema), eligibilityController)

module.exports = elegibitilyRouter