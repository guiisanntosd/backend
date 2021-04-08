import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from '../repositories/ProductsRepository'

class ProductsController {
  async index(req: Request, res: Response) {
    const repository = getCustomRepository(ProductsRepository)

    const products = await repository.find()

    return res.json(products)
  }

  async show(req: Request, res: Response) {
    const repository = getCustomRepository(ProductsRepository)
    const { id } = req.params

    const product = await repository.findOneOrFail(id).catch(() => {
        return res.json({
          error: 'Produto não encontrado!'
        })
      }
    )

    return res.status(200).json(product)
  }

  async update(req: Request, res: Response) {
    const repository = getCustomRepository(ProductsRepository)
    const { id } = req.params
    const { name, color, size, value } = req.body

    const product = await repository.findOne(id)
    if(!product) {
      return res.status(400).json({
        error: 'Produto não existe!'
      })
    }
    
    const updatedProduct = repository.create({ name, color, size, value })
    await repository.update(product, updatedProduct)

    return res.status(200).json(updatedProduct)
  }

  async delete(req: Request, res: Response) {
    const repository = getCustomRepository(ProductsRepository)
    const { id } = req.params

    const product = await repository.findOne(id)
    if(!product) {
      return res.status(400).json({
        error: 'Produto não existe!'
      })
    }

    await repository.delete(product)

    return res.status(200).json(product)
  }

  async create(req: Request, res: Response) {
    const repository = getCustomRepository(ProductsRepository)
    const { name, color, size, value } = req.body
    
    const productAlreadyExists = await repository.findOne({ where: { name } })
    if(productAlreadyExists) {
      return res.status(400).json({
        error: 'Produto já existente' 
      })
    }

    const product = repository.create({ name, color, size, value })
    await repository.save(product)

    return res.status(200).json(product)
  }
}

export default new ProductsController