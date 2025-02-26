import express from "express";
import CategoryController from "../../controllers/category.controller";
import authenticateToken from "../../middleware/authenticate.middleware";
import authorizeRole from "../../middleware/authorize.middleware";
import NoAuthController from "../../controllers/no-auth.controller";

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

const noAuthController = new NoAuthController();

const noAuthRouter = express.Router();

noAuthRouter.get("/courses", noAuthController.getCourses);
noAuthRouter.get("/courses/:courseId", noAuthController.getPublishedCourseById);
noAuthRouter.get("/plans", noAuthController.getAllSubscriptionPlans);

export default noAuthRouter;
