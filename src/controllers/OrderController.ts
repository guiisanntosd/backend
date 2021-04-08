import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../repositories/OrdersRepository";

class OrderController {
  async create(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { client, product, quantity, note, form_of_payment } = req.body

    const order = repository.create({ client, product , quantity, note, form_of_payment })
    await repository.save(order)

    return res.status(200).json(order)
  }

}

export default new OrderController