import express from "express";
import CategoryController from "../../controllers/CategoryController";

const categoriesRouter = express.Router();

categoriesRouter.get("/", CategoryController.fetchAllCategoriesForAdmin);
categoriesRouter.post("/", CategoryController.createCategoryForAdmin);
categoriesRouter.patch(
  "/:categoryId/block-unblock",
  CategoryController.listUnlistCategoryForAdmin
);

export default categoriesRouter;
