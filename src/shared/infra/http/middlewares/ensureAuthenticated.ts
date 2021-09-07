import { AppError } from '@errors/AppError'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError("Token missing!", 401)

  // Bearer 0a98asd9f70asd9f-asd98uasdas8-asdf98ua
  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "6341fadc38631ef3aed38273503ed991") as IPayload
    
    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)
    if (!user) throw new AppError("User does not exits!", 401)

    request.user = {
      id: user_id
    }

    next()
  } catch (error) {
    throw new AppError("Invalid token!", 401)
  }

}