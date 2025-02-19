import express from "express";
import CategoryController from "../../controllers/CategoryController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import NoAuthController from "../../controllers/NoAuthController";

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
