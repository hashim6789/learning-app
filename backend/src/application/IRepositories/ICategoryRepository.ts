import { Category } from "../entities/category.entity";

export interface ICategoryRepository {
  fetchAllCategories(): Promise<Category[] | null>;
  fetchAllListedCategories(): Promise<Category[] | null>;
  toggleStatus(categoryId: string, isListed: boolean): Promise<Category | null>;
  updateCategory(
    categoryId: string,
    data: Partial<Category>
  ): Promise<Category | null>;
  deleteCategory(categoryId: string): Promise<Category | null>;
  createCategory(data: Category): Promise<Category | null>;
  fetchCategoryById(categoryId: string): Promise<Category | null>;
  findCategoryByTitle(categoryTitle: string): Promise<Category | null>;
}
