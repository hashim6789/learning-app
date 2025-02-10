import { Category } from "../../../application/entities/Category";
import { ICategoryRepository } from "../../../application/IRepositories/ICategoryRepository";
import CategoryModel, { ICategory } from "../../database/models/CategoryModel";

class CategoryRepository implements ICategoryRepository {
  //get all categories
  async fetchAllCategories(): Promise<Category[] | null> {
    try {
      const categories = await CategoryModel.find().sort({
        createdAt: -1,
      });
      if (!categories) return null;
      return categories.map(mappedCategory);
    } catch (error) {
      if (error instanceof Error && error.name === "DocumentNotFoundError") {
        return [];
      }
      throw new Error("Failed to fetch the category!");
    }
  }
  async fetchAllListedCategories(): Promise<Category[] | null> {
    const categories = await CategoryModel.find({ isListed: true }).sort({
      createdAt: -1,
    });
    if (!categories || categories.length === 0) return null;
    return categories.map(mappedCategory);
  }

  //get a category by id
  async fetchCategoryById(categoryId: string): Promise<Category | null> {
    const category = await CategoryModel.findById(categoryId);
    if (!category) return null;
    return mappedCategory(category);
  }

  //create a category
  async createCategory(data: Category): Promise<Category | null> {
    const newCategory = new CategoryModel({
      title: data.title,
      isListed: data.isListed,
    });

    const category = await newCategory.save();
    if (!category) return null;
    return mappedCategory(category);
  }

  //update the existing category by id
  async updateCategory(
    categoryId: string,
    data: Partial<Category>
  ): Promise<Category | null> {
    const category = await CategoryModel.findByIdAndUpdate(categoryId, data, {
      new: true,
    });

    if (!category) return null;
    return mappedCategory(category);
  }

  //delete the existing category by id
  async deleteCategory(categoryId: string): Promise<Category | null> {
    const category = await CategoryModel.findByIdAndUpdate(categoryId);
    if (!category) return null;
    return mappedCategory(category);
  }

  //update the isListed status by id
  async toggleStatus(
    categoryId: string,
    isListed: boolean
  ): Promise<Category | null> {
    const category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        isListed,
      },
      { new: true }
    );
    if (!category) return null;
    return mappedCategory(category);
  }

  async findCategoryByTitle(categoryTitle: string): Promise<Category | null> {
    try {
      const category = await CategoryModel.findOne({
        title: { $regex: new RegExp(`^${categoryTitle}$`, "i") },
      });
      if (!category) return null;
      return mappedCategory(category);
    } catch (error) {
      throw new Error("failed to fetch the category by name");
    }
  }
}

function mappedCategory(data: ICategory): Category {
  const id = data._id.toString();

  return new Category(data.title, data.isListed, id);
}
export default CategoryRepository;
