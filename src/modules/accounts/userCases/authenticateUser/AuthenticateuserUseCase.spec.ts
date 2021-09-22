import "reflect-metadata"
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { AppError } from '@errors/AppError'
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { CreateUserUseCase } from "../createUser/createUserUseCase"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() =>{
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
      avatar: "test"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexisting user", async () => {
    await expect(authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "12345"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })

  it("should not be able to authenticate with incorrect password", async () => {

    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
      avatar: "test"
    }

    await createUserUseCase.execute(user)
    await expect(authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"))
  })
})