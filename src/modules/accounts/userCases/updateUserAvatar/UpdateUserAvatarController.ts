import { Request, Response } from 'express'

class UpdateUserAvatarController {

  async handle(request: Request, response: Response) {
    const { id } = request.user
  }

}

export { UpdateUserAvatarController }