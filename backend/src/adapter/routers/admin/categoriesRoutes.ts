import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const categoriesRouter = express.Router();

categoriesRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  CategoryController.fetchAllCategoriesForAdmin
);
categoriesRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  CategoryController.createCategoryForAdmin
);
categoriesRouter.patch(
  "/:categoryId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  CategoryController.listUnlistCategoryForAdmin
);

export default categoriesRouter;
