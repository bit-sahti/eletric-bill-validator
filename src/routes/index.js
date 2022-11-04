const { Router } = require('express')
const { eligibilityController } = require('../controller')
const { validatorMiddleware } = require('../middlewares')
const { eligibilitySchema } = require('./schemas')

const router = Router()

router.get('/', (_, response) => response.redirect('/docs'))

router.post(
  '/eligibility',
  validatorMiddleware(eligibilitySchema),
  eligibilityController
)

module.exports = router
