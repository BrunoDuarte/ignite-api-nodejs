import { Router } from "express"
import multer from "multer"
import uploadConfig from "../config/upload"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateUserController } from "../modules/accounts/userCases/createUser/createUserController"
import { UpdateUserAvatarController } from "../modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { usersRoutes }