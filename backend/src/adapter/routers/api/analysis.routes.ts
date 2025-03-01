import express from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import AnalysisController from "../../controllers/analysys.controller";

const analysisController = new AnalysisController();

const analysisRouter = express.Router();

analysisRouter.get(
  "/mentors/:mentorId/courses",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  analysisController.getMentorCoursesAnalytics
);

export default analysisRouter;
