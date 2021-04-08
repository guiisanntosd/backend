import { Router } from 'express'

import ClientsController from './controllers/ClientsController'

const router = Router()

router.get('/clientes', ClientsController.index)
router.get('/clientes/:id', ClientsController.show)

router.post('/clientes', ClientsController.create)

router.put('/clientes/:id', ClientsController.update)

router.delete('/clientes/:id', ClientsController.delete)


export { router }