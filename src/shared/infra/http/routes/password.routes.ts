import { Router } from 'express'
import { SendForgotPasswordMailController } from '../../../../modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController'
import { ResetPasswordUserController } from '../../../../modules/accounts/userCases/resetPasswordUser/ResetPasswordUserController'

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)

export { passwordRoutes }