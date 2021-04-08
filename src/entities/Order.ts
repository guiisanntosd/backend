import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Product } from "./Product";


@Entity('order')
class Order {
  
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @Column()
  note: string

  @Column()
  form_of_payment: string

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client

  @OneToMany(() => Product, product => product.order)
  product: Product[]

}

export { Order }