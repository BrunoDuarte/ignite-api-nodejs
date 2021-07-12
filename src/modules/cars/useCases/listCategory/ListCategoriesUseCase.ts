import { inject, injectable } from 'tsyringe'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    // if (categories) throw new Error("Items not found!")

    return categories
  }
}

export { ListCategoriesUseCase }