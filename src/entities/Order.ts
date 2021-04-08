import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
  @JoinColumn({ name: 'id_client' })
  client: Client

  @ManyToOne(() => Product, product => product.order)
  @JoinTable()
  @JoinColumn({ name: 'id_product' })
  product: Product

}

export { Order }