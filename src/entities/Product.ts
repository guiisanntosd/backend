import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./Order"

@Entity('products')
class Product {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  color: string

  @Column()
  size: string

  @Column()
  value: number

  @OneToMany(() => Order, order => order.product,{
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'id_product' })
  order: Order[]

}

export { Product }