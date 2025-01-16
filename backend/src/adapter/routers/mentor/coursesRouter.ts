import express from "express";
import CourseController from "../../controllers/CourseController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const coursesRouter = express.Router();

coursesRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  CourseController.createCourseForMentor
);
coursesRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  CourseController.getAllCourseOfMentor
);
coursesRouter.get(
  "/:courseId",
  authenticateToken,
  authorizeRole(["mentor"]),
  CourseController.getCourseOfMentorByCourseId
);

coursesRouter.get(
  "/:courseId/lessons",
  authenticateToken,
  authorizeRole(["mentor"]),
  CourseController.getLessonsOfCourseForMentor
);

export default coursesRouter;
