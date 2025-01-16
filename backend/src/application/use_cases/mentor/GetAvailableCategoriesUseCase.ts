import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ICategoryRepository } from "../../IRepositories/ICategoryRepository";

interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}

class GetAllCategoryOfMentorUseCase {
  private categoryRepository: ICategoryRepository;
  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(): Promise<ResponseModel> {
    try {
      let categories = await this.categoryRepository.fetchAllCategories();

      if (!categories) {
        return {
          statusCode: 400,
          success: false,
          message: "The categories doesn't exist",
        };
      }

      categories = categories.filter((category) => category.isListed === true);
      if (!categories || categories.length === 0) {
        return {
          statusCode: 400,
          success: false,
          message: "The category didn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The available categories fetched successfully",
        data: categories,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default GetAllCategoryOfMentorUseCase;
