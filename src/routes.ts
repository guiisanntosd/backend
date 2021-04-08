import { Router } from 'express'

import ClientsController from './controllers/ClientsController'
import ProductsController from './controllers/ProductsController'

const router = Router()

router.get('/clientes', ClientsController.index)
router.get('/clientes/:id', ClientsController.show)
router.get('/produtos', ProductsController.index)
router.get('/produtos/:id', ProductsController.show)

router.post('/clientes', ClientsController.create)
router.post('/produtos', ProductsController.create)

router.put('/clientes/:id', ClientsController.update)
router.put('/produtos/:id', ProductsController.update)

router.delete('/clientes/:id', ClientsController.delete)
router.delete('/produtos/:id', ProductsController.delete)


export { router }