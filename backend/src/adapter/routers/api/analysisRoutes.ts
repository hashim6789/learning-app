import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";
import AnalysisController from "../../controllers/AnalysisController";

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
