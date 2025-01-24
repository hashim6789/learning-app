import express from "express";
import CourseController from "../../controllers/CourseController";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import authenticateToken from "../../middleware/authenticateMiddlewares";

const courseController = new CourseController();

const courseRouter = express.Router();

courseRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  courseController.getAllCourseOfAdmin.bind(courseController)
);

export default courseRouter;
