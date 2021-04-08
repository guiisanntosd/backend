import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('clients')
class Client {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  cpf: string

  @Column()
  genre: string

  @Column()
  email: string

}

export { Client }