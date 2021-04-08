import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../repositories/OrdersRepository";
import pdf from 'html-pdf'

class OrderController {
  async report(req: Request, res: Response) {
    
  }

  async index(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)

    const orders = await repository.find({
      relations: ['client', 'product'],
    })

    return res.json(orders)
  }

  async show(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { id } = req.params

    const order = await repository.findOneOrFail(id, {
      relations: ['client', 'product'],
      where: { id }
    }).catch(() => {
        return res.json({
          error: 'Pedido não encontrado!'
        })
      }
    )

    return res.status(200).json(order)
  }
  async update(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { id } = req.params
    const { client, product, quantity, note, form_of_payment } = req.body

    const order = await repository.findOne(id)
    if(!order) {
      return res.status(400).json({
        error: 'Cliente não existe!'
      })
    }
    
    const updatedOrder = repository.create({ client, product, quantity, note, form_of_payment })
    await repository.update(client, updatedOrder)

    return res.status(200).json(updatedOrder)
  }
  async delete(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { id } = req.params

    const order = await repository.findOne(id)
    if(!order) {
      return res.status(400).json({
        error: 'Pedido não existe!'
      })
    }

    await repository.delete(order)
    return res.status(200).json(order)
  }

  async create(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { client, product, quantity, note, form_of_payment } = req.body
    
    const orderAlreadyExists = await repository.findOne({
      relations: ['client'],
      where: { client }
    })
    if(orderAlreadyExists) {
      return res.status(400).json({
        message: 'Cliente já possui um pedido'
      })
    }

    const order = repository.create({ client, product, quantity, note, form_of_payment })
    await repository.save(order)

    return res.status(200).json(order)
  }

}

export default new OrderController