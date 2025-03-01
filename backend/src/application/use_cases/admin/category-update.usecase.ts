import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ICategoryRepository } from "../../../infrastructures/database/repositories/interface/ICategoryRepository";

class UpdateCategoryUseCase {
  private categoryRepository: ICategoryRepository;
  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(data: {
    title: string;
    categoryId: string;
  }): Promise<ResponseModel> {
    try {
      // Check if the category exists
      const category = await this.categoryRepository.fetchCategoryById(
        data.categoryId
      );
      if (!category) {
        return {
          statusCode: 404,
          success: false,
          message: "The category doesn't exist!",
        };
      }

      // Check if the new title already exists in another category
      const existingCategory =
        await this.categoryRepository.findCategoryByTitle(data.title);
      if (existingCategory && existingCategory.id !== data.categoryId) {
        return {
          statusCode: 400,
          success: false,
          message: "A category with this title already exists!",
        };
      }

      // Proceed with the update if no duplicates found
      const updatedCategory = await this.categoryRepository.updateCategory(
        data.categoryId,
        {
          title: data.title,
        }
      );
      if (!updatedCategory) {
        return {
          statusCode: 400,
          success: false,
          message: "The category update failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The category is updated successfully!",
        data: updatedCategory,
      };
    } catch (error) {
      console.error("Error updating category:", error);
      return {
        statusCode: 500,
        success: false,
        message: "An error occurred while updating the category.",
      };
    }
  }
}

export default UpdateCategoryUseCase;
