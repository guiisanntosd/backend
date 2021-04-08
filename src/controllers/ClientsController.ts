import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ClientsRepository } from "../repositories/ClientsRepository";

class ClientsController {
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