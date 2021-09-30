import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { hash } from "bcrypt";

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) throw new AppError("Invalid Token!")

    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Invalid Token!")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)
    
    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }