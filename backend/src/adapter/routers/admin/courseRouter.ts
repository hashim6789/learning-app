// import express from "express";
// import CourseController from "../../controllers/CourseController";
// import authorizeRole from "../../middleware/authorizationMiddlewares";
// import authenticateToken from "../../middleware/authenticateMiddlewares";

// //courseController instance created.
// const courseController = new CourseController();

// //courseRouter is created,
// const courseRouter = express.Router();

// //----------------------admin course related routes------------------------------//

// /**
//  * fetch admin courses route
//  * endpoint - /admin/courses
//  * method -  get
//  * body - {}
//  * params - {}
//  * response - {success, message, data:courses}
//  */
// courseRouter.get(
//   "/",
//   authenticateToken,
//   authorizeRole(["admin"]),
//   courseController.getAllCourseOfAdmin
// );

// /**
//  * fetch admin course route
//  * endpoint - /admin/courses/:courseId
//  * method -  get
//  * body - {}
//  * params - {courseId}
//  * response - {success, message, data:course}
//  */
// courseRouter.get(
//   "/:courseId",
//   authenticateToken,
//   authorizeRole(["admin"]),
//   courseController.getCourseById
// );
// export default courseRouter;
