import { Request, Response, NextFunction } from "express";
import CategoryRepository from "../../infrastructures/database/repositories/CategoryRepository";
import GetCategoriesUseCase from "../../application/use_cases/admin/GetCategoriesUseCase";
import CreateCategoryUseCase from "../../application/use_cases/admin/CreateCategoryUseCase";
import ListUnListCategoryUseCase from "../../application/use_cases/admin/ListUnlistCategoryUseCase";
import UpdateCategoryUseCase from "../../application/use_cases/admin/UpdateCategoryUseCase";

const categoryRepository = new CategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const listUnListCategoryUseCase = new ListUnListCategoryUseCase(
  categoryRepository
);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);

class CategoryController {
  async fetchAllCategoriesForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await getCategoriesUseCase.execute();
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async fetchAllAvailableCategoriesForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await getCategoriesUseCase.execute();
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async createCategoryForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, isListed } = req.body;
      const response = await createCategoryUseCase.execute({
        title,
        isListed,
      });
      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async listUnlistCategoryForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { change } = req.body;
      const { categoryId } = req.params;
      const response = await listUnListCategoryUseCase.execute(categoryId, {
        change,
      });
      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async updateCategoryForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title } = req.body;
      const { categoryId } = req.params;
      const response = await updateCategoryUseCase.execute({
        categoryId,
        title,
      });
      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
