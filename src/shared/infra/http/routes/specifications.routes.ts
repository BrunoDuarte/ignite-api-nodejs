import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }