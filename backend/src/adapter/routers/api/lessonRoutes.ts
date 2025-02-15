import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import LessonController from "../../controllers/LessonController";
import checkUserBlocked from "../../middleware/checkBlockMiddleware";

//lessonController instance created.
const lessonController = new LessonController();

//lessonRouter is created,
const lessonRouter = express.Router();

//----------------------mentor lesson routes------------------------------//

/**
 * mentor lesson create route
 * endpoint - /api/lessons
 * method -  post
 * body - {title, description, materials, duration}
 * response - {success, message, data:lesson}
 */
lessonRouter.post(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  lessonController.createLesson
);

/**
 * fetch mentor lesson route
 * endpoint - /api/lessons
 * method -  get
 * body - {}
 * response - {success, message, data:lessons}
 */
lessonRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  lessonController.getAllLessons
);

/**
 * fetch mentor lessons route
 * endpoint - /api/lessons/:lessonId
 * method -  get
 * params - {lessonId}
 * response - {success, message, data:lesson}
 */
lessonRouter.get(
  "/:lessonId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor", "admin"]),
  lessonController.getLessonById
);

/**
 * mentor lesson update route
 * endpoint - /api/lessons/:lessonId
 * method -  put
 * body - {title, description, materials, duration}
 * params - {lessonId}
 * response - {success, message, data:lesson}
 */
lessonRouter.put(
  "/:lessonId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  lessonController.updateLesson
);

/**
 * mentor delete lesson route
 * endpoint - /api/lessons/:lessonId
 * method -  delete
 * params - {lessonId}
 * response - {success, message, data:lesson}
 */
lessonRouter.delete(
  "/:lessonId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  lessonController.deleteLesson
);

/**
 * fetch mentor materials by lessonId route
 * endpoint - /api/lessons/:lessonId/materials
 * method -  get
 * params - {lessonId}
 * response - {success, message, data:materials}
 */
lessonRouter.get(
  "/:lessonId/materials",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor", "admin"]),
  lessonController.getMaterialsByLessonId
);
export default lessonRouter;
