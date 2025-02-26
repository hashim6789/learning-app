import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ICategoryRepository } from "../../IRepositories/ICategoryRepository";

class GetCategoriesUseCase {
  private categoryRepository: ICategoryRepository;
  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(): Promise<ResponseModel> {
    const categories = await this.categoryRepository.fetchAllCategories();
    if (!categories)
      return {
        statusCode: 404,
        success: false,
        message: "The categories are doesn't exist!",
      };
    return {
      statusCode: 200,
      success: true,
      message: "The categories are fetched successfully.",
      data: categories,
    };
  }
}

export default GetCategoriesUseCase;
