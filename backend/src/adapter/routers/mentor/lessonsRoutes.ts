import express from "express";
import LessonController from "../../controllers/LessonController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";

const lessonRouter = express.Router();

lessonRouter.post(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  LessonController.createLessonForMentor
);
lessonRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["mentor"]),
  LessonController.getAllLessonsOfMentor
);
// lessonRouter.get(
//   "/",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   LessonController.getAllLessonsOfCourse
// );
// coursesRouter.get(
//   "/:courseId",
//   authenticateToken,
//   authorizeRole(["mentor"]),
//   CourseController.getCourseOfMentorByCourseId
// );

export default lessonRouter;
