import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const categoryController = new CategoryController();

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
categoriesRouter.put(
  "/:categoryId",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.updateCategoryForAdmin.bind(categoryController)
);

export default categoriesRouter;
