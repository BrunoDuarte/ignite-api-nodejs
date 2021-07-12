import { ISpecificationsRepository, ICreateSpecificationDTO } from '../ISpecificationsRepository'
import { Specification } from '../../entities/Specification'
import { getRepository, Repository } from 'typeorm'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specificatino = await this.repository.findOne({name})
    
    return specificatino
  }
}

export { SpecificationsRepository }