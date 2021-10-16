import "reflect-metadata"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/Implementations/DayjsDateProvider"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "../../../../errors/AppError"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  })

  it("should be able to send a forgot password mail to user", async () => {
    const send = jest.spyOn(mailProvider, "send")
    
    await usersRepositoryInMemory.create({
      driver_license: "2820313158",
      email: "mipifzah@pahad.tc",
      name: "Ethan Guerrero",
      password: "1234", 
      avatar: "Brunei"
    })

    await sendForgotPasswordMailUseCase.execute("mipifzah@pahad.tc")

    expect(send).toHaveBeenCalled()
  })

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ka@uj.gr")
    ).rejects.toEqual(new AppError("User does not exists!"))
  })

  it("should be able to create an users token", async () => {
    const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "1198984333",
      email: "caisna@po.mn",
      name: "Ethel Lyons",
      password: "4321", 
      avatar: "Bermuda"
    })

    await sendForgotPasswordMailUseCase.execute("caisna@po.mn")

    expect(generateTokenEmail).toBeCalled()
  })
})