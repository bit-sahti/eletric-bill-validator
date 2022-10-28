const { Router } = require('express')
const { elegibilityController } = require('../controller')

const elegibitilyRouter = Router()

elegibitilyRouter.post('/elegibility', elegibilityController)

module.exports = elegibitilyRouter