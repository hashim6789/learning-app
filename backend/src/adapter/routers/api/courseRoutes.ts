import express from "express";
import CourseController from "../../controllers/CourseController";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";

//courseController instance created.
const courseController = new CourseController();

//coursesRouter is created,
const coursesRouter = express.Router();

//----------------------mentor course routes------------------------------//

/**
 * mentor course create route
 * endpoint - /mentor/courses
 * method -  post
 * body - {title, description, category, thumbnail, duration, lessons}
 * response - {success, message, data:course}
 */
coursesRouter.post(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.createCourseForMentor
);

/**
 * mentor course update route
 * endpoint - /mentor/courses/:courseId
 * method -  put
 * body - {title, description, category, thumbnail, duration, lessons}
 * params - {courseId}
 * response - {success, message, data:course}
 */
coursesRouter.put(
  "/:courseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.updateCourseForMentor
);

/**
 * mentor course delete route
 * endpoint - /mentor/courses/:courseId
 * method -  delete
 * params - {courseId}
 * response - {success, message, data:course}
 */
coursesRouter.delete(
  "/:courseId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  courseController.deleteCourseForMentor
);

/**
 * mentor course update status route
 * endpoint - /mentor/courses/:courseId
 * method -  patch
 * params - {courseId}
 * response - {success, message, data:course}
 */
coursesRouter.patch(
  "/:courseId/update-status",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor", "admin"]),
  courseController.updateCourseStatus
);

/**
 * fet mentor courses route
 * endpoint - /mentor/courses
 * method -  get
 * params - {}
 * response - {success, message, data:courses}
 */
coursesRouter.get(
  "/",
  authorizeRole(["mentor", "learner"]),
  courseController.getAllPublishedCourses
);

/**
 * fet mentor courses analysis route
 * endpoint - /mentor/courses
 * method -  get
 * params - {}
 * response - {success, message, data:courses}
 */
// coursesRouter.get(
//   "mentors/:mentorId",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   courseController.getMentorCoursesAnalytics
// );

/**
 * get mentor course route
 * endpoint - /mentor/courses/:courseId
 * method -  get
 * params - {courseId}
 * response - {success, message, data:course}
 */
coursesRouter.get(
  "/:courseId",
  authorizeRole(["learner"]),
  courseController.getCourseForLearner
);

/**
 * get mentor course lessons route
 * endpoint - /mentor/courses/:courseId/lessons
 * method -  get
 * params - {courseId}
 * response - {success, message, data:lessons}
 */
// coursesRouter.get(
//   "/:courseId/lessons",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   courseController.getLessonsOfCourseForMentor
// );

export default coursesRouter;
