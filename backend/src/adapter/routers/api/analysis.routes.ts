import express from "express";
import authenticateToken from "../../middleware/authenticate.middleware";
import authorizeRole from "../../middleware/authorize.middleware";
import checkUserBlocked from "../../middleware/check-blocked.middleware";
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
