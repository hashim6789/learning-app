import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";

//categoryController instance created.
const categoryController = new CategoryController();

//categoryRouter is created,
const categoryRouter = express.Router();

//----------------------mentor category routes------------------------------//

/**
 * mentor fetch category route
 * endpoint - /mentor/categories
 * method -  get
 * body - {}
 * response - {success, message, data:categories}
 */
categoryRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  categoryController.fetchAllAvailableCategoriesForMentor
);

export default categoryRouter;
