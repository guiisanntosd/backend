import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../repositories/OrdersRepository";
import SendMailService from "../services/SendMailService";
import pdf from 'html-pdf'
import path from 'path'

class OrderController {
  async report(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { id } = req.params

    const order = await repository.findOne(id, {
      relations: ['client', 'product'],
      where: { id }
    })

    const variable = {
      produto: order.product.name,
      cor: order.product.color,
      tamanho: order.product.size,
      quantidade: order.quantity,
      valor: order.product.value/100,
      total: (order.product.value * order.quantity) / 100,
      form_of_payment: order.form_of_payment,
      client: order.client.name,
      cpf: order.client.cpf,
      genre: order.client.genre,
      email: order.client.email,
    }

    const conteudo = `
      <div>
        <h2 style='color: #666;' align='center'> Relatório do pedido <h2>
      </div>
      <div style='margint-bottom: 10px;'>
        <h5 style='color: #111 font-size: 14pt; margin: 0'> ${variable.produto} </h5>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> cor: ${variable.cor} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> tamanho: ${variable.tamanho} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> quantidade: x${variable.quantidade} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> valor: R$ ${variable.valor} </p>
      </div>
      <hr/>
      <div>
        <p style='color: #111 ;font-size: 12pt; margin: 0;'> Total: R$ ${variable.total} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> ${variable.form_of_payment} </p>
      </div>
      <hr/>
      <div>
        <p style='color: #111 ;font-size: 12pt; margin: 0;'> ${variable.client} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> ${variable.cpf} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> ${variable.genre} </p>
        <p style='color: #666 ;font-size: 12pt; margin: 0;'> ${variable.email} </p>
      </div>
    `
    pdf.create(conteudo, {}).toFile(path.join(__dirname, '..', '..', `uploads/report.pdf`), (err, res) => {
      if(err) {
        console.log('erro')
      }
      else {
        console.log(res)
      }
    })
  }
  async sendmail(req: Request, res: Response) {
    const repository = getCustomRepository(OrdersRepository)
    const { id } = req.params

    const order =  await repository.findOne(id, {
      relations: ['product', 'client']
    })

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    const variables = {
      produto: order.product.name,
      cor: order.product.color,
      tamanho: order.product.size,
      quantidade: order.quantity,
      valor: order.product.value/100,
      total: (order.product.value * order.quantity) / 100,
      form_of_payment: order.form_of_payment,
      client: order.client.name,
      cpf: order.client.cpf,
      genre: order.client.genre,
      email: order.client.email,
    }

    await SendMailService.execute(order.client.email, 'Compra efetuada', variables, npsPath)

    return res.json({
      message: 'Enviado para o email!'
    })
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