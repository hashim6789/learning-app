// import express from "express";
// import authenticateToken from "../../middleware/authenticateMiddlewares";
// import authorizeRole from "../../middleware/authorizationMiddlewares";
// import LessonController from "../../controllers/LessonController";
// import checkUserBlocked from "../../middleware/checkBlockMiddleware";

// //lessonController instance created.
// const lessonController = new LessonController();

// //lessonRouter is created,
// const lessonRouter = express.Router();

// //----------------------mentor lesson routes------------------------------//

// /**
//  * mentor lesson create route
//  * endpoint - /mentor/lessons
//  * method -  post
//  * body - {title, description, materials, duration}
//  * response - {success, message, data:lesson}
//  */
// lessonRouter.post(
//   "/",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   lessonController.createLessonForMentor
// );

// /**
//  * fetch mentor lesson route
//  * endpoint - /mentor/lessons
//  * method -  get
//  * body - {}
//  * response - {success, message, data:lessons}
//  */
// lessonRouter.get(
//   "/",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   lessonController.getAllLessonsOfMentor
// );

// /**
//  * fetch mentor lessons route
//  * endpoint - /mentor/lessons/:lessonId
//  * method -  get
//  * params - {lessonId}
//  * response - {success, message, data:lesson}
//  */
// lessonRouter.get(
//   "/:lessonId",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   lessonController.getLessonById
// );

// /**
//  * mentor lesson update route
//  * endpoint - /mentor/lessons/:lessonId
//  * method -  put
//  * body - {title, description, materials, duration}
//  * params - {lessonId}
//  * response - {success, message, data:lesson}
//  */
// lessonRouter.put(
//   "/:lessonId",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   lessonController.updateLessonOfMentor
// );

// /**
//  * mentor delete lesson route
//  * endpoint - /mentor/lessons/:lessonId
//  * method -  delete
//  * params - {lessonId}
//  * response - {success, message, data:lesson}
//  */
// lessonRouter.delete(
//   "/:lessonId",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   lessonController.deleteLessonOfMentor
// );

// /**
//  * fetch mentor materials by lessonId route
//  * endpoint - /mentor/lessons/:lessonId/materials
//  * method -  get
//  * params - {lessonId}
//  * response - {success, message, data:materials}
//  */
// lessonRouter.get(
//   "/:lessonId/materials",
//   authenticateToken,
//   checkUserBlocked,
//   authorizeRole(["mentor"]),
//   lessonController.getMaterialsByLessonId
// );
// export default lessonRouter;
