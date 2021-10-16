import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from 'uuid'
import { resolve } from 'path';
import { AppError } from "../../../../errors/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "../../infra/typeorm/repositories/UsersTokensRepository"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/Implementations/DayjsDateProvider"
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider"
import { EtherealMailProvider } from "../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider"


@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    )

    if (!user) throw new AppError("User does not exists!")

    const token = uuidV4()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.send(
      email, 
      "Password recovery",
      variables,
      templatePath
    )

  }
}

export { SendForgotPasswordMailUseCase }