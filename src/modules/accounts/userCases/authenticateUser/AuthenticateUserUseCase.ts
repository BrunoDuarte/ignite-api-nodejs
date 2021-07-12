import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../errors/AppError'
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}
  async execute({email, password}: IRequest): Promise<IResponse> {
    // user exits
    const user = await this.usersRepository.findByEmail(email)

    // password is correct and
    if (!user) throw new AppError("Email or password incorrect!")

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new AppError("Email or password incorrect!")

    // generate json web token
    const token = sign({}, "6341fadc38631ef3aed38273503ed991", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase } 