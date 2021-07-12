import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from '../../../../errors/AppError'
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from 'bcrypt'

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, password, driver_licence}: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) throw new AppError("User already exists")

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_licence
    })
  }
}

export { CreateUserUseCase }