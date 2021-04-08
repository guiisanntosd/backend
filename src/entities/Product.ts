import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('clients')
class Client {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  color: string

  @Column()
  size: string

  @Column()
  value: string

}

export { Client }