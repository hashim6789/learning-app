import express from "express";
import CategoryController from "../../controllers/category.controller";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
//authController instance created.
//authRouter is created,

//----------------------admin authentication routes------------------------------//

/**
 * admin login route
 * endpoint - /admin/auth/login
 * method -  post
 * body - {email, password}
 * response - {success, message, data?}
 */

const categoryController = new CategoryController();

const categoriesRouter = express.Router();

categoriesRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin", "mentor"]),
  categoryController.fetchAllCategoriesForAdmin
);
categoriesRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.createCategoryForAdmin
);
categoriesRouter.patch(
  "/:categoryId/list-unlist",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.listUnlistCategoryForAdmin
);
categoriesRouter.put(
  "/:categoryId",
  authenticateToken,
  authorizeRole(["admin"]),
  categoryController.updateCategoryForAdmin
);

export default categoriesRouter;
