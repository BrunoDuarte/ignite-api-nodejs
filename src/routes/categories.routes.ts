import { Router } from 'express'
import multer from "multer"

// import createCategoryController from '../modules/cars/useCases/createCategory'
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController"
import { ListCategoriesController } from '../modules/cars/useCases/listCategory/ListCategoriesController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/import', importCategoryController.handle)

export { categoriesRoutes }