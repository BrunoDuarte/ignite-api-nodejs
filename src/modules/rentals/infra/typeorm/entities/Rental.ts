import { Car } from "../../../../cars/infra/typeorm/entities/Car"
import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity("rentals")
class Rental {

  @PrimaryColumn()
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id"})
  car: Car

  @Column()
  car_id: string

  @Column()
  user_id: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  expected_return_date: Date

  @Column()
  total: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if(!this.id) this.id = uuidv4()
    // if(!this.start_date) this.start_date = new Date()
    // if(!this.end_date) this.end_date = new Date()
    // if(!this.total) this.total = null
  }
}

export { Rental }