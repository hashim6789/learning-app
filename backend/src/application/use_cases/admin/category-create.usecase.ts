import { ResponseModel } from "../../../shared/types/ResponseModel";
import { Category } from "../../entities/category.entity";
import { ICategoryRepository } from "../../IRepositories/ICategoryRepository";

class CreateCategoryUseCase {
  private categoryRepository: ICategoryRepository;
  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data: Category): Promise<ResponseModel> {
    const existingCategory = await this.categoryRepository.findCategoryByTitle(
      data.title
    );
    if (existingCategory) {
      return {
        statusCode: 400,
        success: false,
        message: "The same named category already exist!",
      };
    }
    const category = await this.categoryRepository.createCategory(data);
    if (!category)
      return {
        statusCode: 400,
        success: false,
        message: "The category cannot be create!",
      };
    return {
      statusCode: 201,
      success: true,
      message: "The category is created successfully.",
      data: category,
    };
  }
}

export default CreateCategoryUseCase;
