import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import CategoryRepository from "../../../infrastructures/database/repositories/CategoryRepository";
import GetCategoriesUseCase from "../../../application/use_cases/admin/GetCategoriesUseCase";
import CreateCategoryUseCase from "../../../application/use_cases/admin/CreateCategoryUseCase";
import ListUnListCategoryUseCase from "../../../application/use_cases/admin/ListUnlistCategoryUseCase";

const categoryRepository = new CategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const listUnListCategoryUseCase = new ListUnListCategoryUseCase(
  categoryRepository
);

const categoryController = new CategoryController(
  getCategoriesUseCase,
  createCategoryUseCase,
  listUnListCategoryUseCase
);

const categoriesRouter = express.Router();

categoriesRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.fetchAllCategoriesForAdmin.bind(categoryController)
);
categoriesRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.createCategoryForAdmin.bind(categoryController)
);
categoriesRouter.patch(
  "/:categoryId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.listUnlistCategoryForAdmin.bind(categoryController)
);

export default categoriesRouter;
