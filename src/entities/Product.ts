import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
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

  @OneToMany(() => Order, order => order.product)
  order: Order

}

export { Product }