import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
  value: string

}

export { Product }