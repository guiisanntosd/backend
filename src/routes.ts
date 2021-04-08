import { Router } from 'express'

import ClientsController from './controllers/ClientsController'

const router = Router()

router.post('/clientes', ClientsController.create)

export { router }