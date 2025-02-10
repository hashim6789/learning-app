import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

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
  "/:categoryId/list-unlist",
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
