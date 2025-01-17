import { Request, Response, NextFunction } from "express";
import CategoryRepository from "../../infrastructures/database/repositories/CategoryRepository";
import GetCategoriesUseCase from "../../application/use_cases/admin/GetCategoriesUseCase";
import CreateCategoryUseCase from "../../application/use_cases/admin/CreateCategoryUseCase";
import ListUnListCategoryUseCase from "../../application/use_cases/admin/ListUnlistCategoryUseCase";
import { IGetCategoriesUseCase } from "../IUseCases/admin/IGetCategoriesUseCase";
import { ICreateCategoryUseCase } from "../../application/use_cases/admin/ICreateCategoryUseCase";
import { IListUnListCategoryUseCase } from "../IUseCases/admin/IListUnListCategory";

const categoryRepository = new CategoryRepository();
const listUnListCategoryUseCase = new ListUnListCategoryUseCase(
  categoryRepository
);
class CategoryController {
  private getCategoriesUseCase: IGetCategoriesUseCase;
  private createCategoryUseCase: ICreateCategoryUseCase;
  private listUnListCategoryUseCase: IListUnListCategoryUseCase;
  constructor(
    getCategoriesUseCase: IGetCategoriesUseCase,
    createCategoryUseCase: ICreateCategoryUseCase,
    listUnListCategoryUseCase: IListUnListCategoryUseCase
  ) {
    this.getCategoriesUseCase = getCategoriesUseCase;
    this.createCategoryUseCase = createCategoryUseCase;
    this.listUnListCategoryUseCase = listUnListCategoryUseCase;
  }
  async fetchAllCategoriesForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.getCategoriesUseCase.execute();
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
      const response = await this.getCategoriesUseCase.execute();
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
      const response = await this.createCategoryUseCase.execute({
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
      const response = await this.listUnListCategoryUseCase.execute(
        categoryId,
        {
          change,
        }
      );
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
