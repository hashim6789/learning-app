import express from "express";
import CourseController from "../../controllers/CourseController";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import authenticateToken from "../../middleware/authenticateMiddlewares";

const courseRouter = express.Router();

courseRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  CourseController.getAllCourseOfAdmin
);

export default courseRouter;
