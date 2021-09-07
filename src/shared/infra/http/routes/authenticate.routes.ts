import { AuthenticateUserController } from '@modules/accounts/userCases/authenticateUser/AuthenticateUserController'
import { Router } from 'express'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('/sessions', authenticateUserController.handle)

export { authenticateRoutes }