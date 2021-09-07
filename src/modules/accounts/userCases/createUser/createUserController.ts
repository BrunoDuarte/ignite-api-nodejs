import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateUserUseCase } from "./createUserUseCase"

class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {name, username, email, password, driver_license, avatar} = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name, 
      email,
      password,
      driver_license, 
      avatar
    })

    return response.status(201).send()
  }
}

export { CreateUserController }