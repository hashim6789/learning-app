// src/adapters/routes/progressRoutes.ts
import { Router } from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import { ProgressController } from "../../controllers/ProgressController";

const progressRouter = Router();

const progressController = new ProgressController();

progressRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  progressController.getProgressesByUserId
);

progressRouter.get(
  "/courses/:courseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  progressController.getProgressDetailsOfUserAndCourse
);
progressRouter.get(
  "/:progressId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  progressController.getProgressDetailsOfUserAndCourse
);

progressRouter.post(
  "/:progressId/get-signed-url",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  progressController.createSignedUrl
);

progressRouter.put(
  "/:progressId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  progressController.updateProgress
);

export default progressRouter;
