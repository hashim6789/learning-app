import express from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import MeetController from "../../controllers/meet.controller";

const meetController = new MeetController();

const meetRouter = express.Router();

meetRouter.get("/:meetId/start", meetController.startMeet);
meetRouter.get("/:meetId/accept", meetController.acceptMeet);
meetRouter.get("/:meetId/decline", meetController.declineMeet);
meetRouter.get("/", meetController.getMeetings);
// meetRouter.get("/courses/:courseId", meetController.getPublishedCourseById);
// meetRouter.get("/plans", meetController.getAllSubscriptionPlans);

export default meetRouter;
