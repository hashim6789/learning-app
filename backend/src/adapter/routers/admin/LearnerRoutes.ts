import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import LearnerController from "../../controllers/LearnerController.ts";

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

const learnerRouter = express.Router();
const learnerController = new LearnerController();

learnerRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getAllLearnersForAdmin
);

learnerRouter.get(
  "/:learnerId",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getLearnerForAdmin
);

learnerRouter.patch(
  "/:learnerId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.blockUnblockLearner
);

export default learnerRouter;
