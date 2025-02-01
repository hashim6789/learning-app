import express from "express";
import CourseController from "../../controllers/CourseController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import checkUserBlocked from "../../middleware/chackBlockMiddleware";

const coursesRouter = express.Router();
const courseController = new CourseController();

coursesRouter.post(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.createCourseForMentor
);
coursesRouter.put(
  "/:courseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.updateCourseForMentor
);
coursesRouter.delete(
  "/:courseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.deleteCourseForMentor
);
coursesRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.getAllCourseOfMentor
);
coursesRouter.get(
  "/:courseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.getCourseOfMentorByCourseId
);

coursesRouter.get(
  "/:courseId/lessons",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.getLessonsOfCourseForMentor
);

export default coursesRouter;
