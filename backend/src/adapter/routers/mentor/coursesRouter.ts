import express from "express";
import CourseController from "../../controllers/CourseController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const coursesRouter = express.Router();
const courseController = new CourseController();

coursesRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  courseController.createCourseForMentor
);
coursesRouter.put(
  "/:courseId",
  authenticateToken,
  authorizeRole(["mentor"]),
  courseController.updateCourseForMentor
);
coursesRouter.delete(
  "/:courseId",
  authenticateToken,
  authorizeRole(["mentor"]),
  courseController.deleteCourseForMentor
);
coursesRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  courseController.getAllCourseOfMentor
);
coursesRouter.get(
  "/:courseId",
  authenticateToken,
  authorizeRole(["mentor"]),
  courseController.getCourseOfMentorByCourseId
);

coursesRouter.get(
  "/:courseId/lessons",
  authenticateToken,
  authorizeRole(["mentor"]),
  courseController.getLessonsOfCourseForMentor
);

export default coursesRouter;
