import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClientsRepository } from "../repositories/ClientsRepository";

class ClientsController {
  async index(req: Request, res: Response) {
    const repository = getCustomRepository(ClientsRepository)

    const clients = await repository.find()

    return res.json(clients)
  }

  async show(req: Request, res: Response) {
    const repository = getCustomRepository(ClientsRepository)
    const { id } = req.params

    const client = await repository.findOneOrFail(id).catch(() => {
        return res.json({
          error: 'Cliente não encontrado!'
        })
      }
    )

    return res.status(200).json(client)
  }

  async update(req: Request, res: Response) {
    const repository = getCustomRepository(ClientsRepository)
    const { id } = req.params
    const { name, cpf, genre, email } = req.body

    const client = await repository.findOne(id)
    if(!client) {
      return res.status(400).json({
        error: 'Cliente não existe!'
      })
    }
    
    const updatedClient = repository.create({ name, cpf, genre, email })
    await repository.update(client, updatedClient)

    return res.status(200).json(updatedClient)
  }

  async delete(req: Request, res: Response) {
    const repository = getCustomRepository(ClientsRepository)
    const { id } = req.params

    const client = await repository.findOne(id)
    if(!client) {
      return res.status(400).json({
        error: 'Cliente não existe!'
      })
    }

    await repository.delete(client)

    return res.status(200).json(client)
  }

  async create(req: Request, res: Response) {
    const repository = getCustomRepository(ClientsRepository)
    const { name, cpf, genre, email } = req.body
    
    const clientAlreadyExists = await repository.findOne({ where: [{ email }, { cpf }] })
    if(clientAlreadyExists) {
      return res.status(400).json({
        error: 'Email ou CPF já existente' 
      })
    }

    const client = repository.create({ name, cpf, genre, email })
    await repository.save(client)

    return res.status(200).json(client)
  }
}

export default new ClientsController