import { Router } from 'express'

import ClientsController from './controllers/ClientsController'
import OrderController from './controllers/OrderController'
import ProductsController from './controllers/ProductsController'

const router = Router()

router.get('/clientes', ClientsController.index)
router.get('/clientes/:id', ClientsController.show)
router.get('/produtos', ProductsController.index)
router.get('/produtos/:id', ProductsController.show)
router.get('/pedidos', OrderController.index)
router.get('/pedidos/:id', OrderController.show)

router.post('/clientes', ClientsController.create)
router.post('/produtos', ProductsController.create)
router.post('/pedidos', OrderController.create)

router.put('/clientes/:id', ClientsController.update)
router.put('/produtos/:id', ProductsController.update)
router.put('/pedidos/:id', OrderController.update)

router.delete('/clientes/:id', ClientsController.delete)
router.delete('/produtos/:id', ProductsController.delete)
router.delete('/pedidos/:id', OrderController.delete)



export { router }