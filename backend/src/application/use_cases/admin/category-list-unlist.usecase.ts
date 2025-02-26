import { ResponseModel } from "../../../shared/types/ResponseModel";
import { ICategoryRepository } from "../../IRepositories/ICategoryRepository";

interface BlockData {
  change: boolean;
}
class ListUnListCategoryUseCase {
  private categoryRepository: ICategoryRepository;
  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: string, data: BlockData): Promise<ResponseModel> {
    try {
      const category = await this.categoryRepository.toggleStatus(
        categoryId,
        data.change
      );
      if (!category)
        return {
          statusCode: 404,
          success: false,
          message: "The category is doesn't exist!",
        };
      return {
        statusCode: 200,
        success: true,
        message: data.change
          ? "The category is unlisted successfully."
          : "The category is listed successfully.",
        data: category,
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export default ListUnListCategoryUseCase;
