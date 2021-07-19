import { User } from "../../entities/User"
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({email})
    return user
  }

  async create({name, email, driver_licence, password, avatar, id}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_licence,
      password, 
      avatar,
      id
    })

    await this.repository.save(user)
  }

}

export { UsersRepository }