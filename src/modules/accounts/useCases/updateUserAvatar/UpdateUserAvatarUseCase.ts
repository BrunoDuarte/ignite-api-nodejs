import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string
  avatar_file: string
}

// Adicionar coluna avatar na tabela users
// Refatorar usuario com coluna avatar
// Configuracao upload multer 
// Criar regra de negocio do upload
// Criar controller

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ){}
  
  async execute({user_id, avatar_file}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user.avatar) await this.storageProvider.delete(user.avatar, "avatar")
    
    await this.storageProvider.save(avatar_file, "avatar")

    user.avatar = avatar_file
    
    await this.usersRepository.create(user)
  }

}

export { UpdateUserAvatarUseCase }