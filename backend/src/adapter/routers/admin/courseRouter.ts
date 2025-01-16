import express from "express";
import CourseController from "../../controllers/CourseController";

const courseRouter = express.Router();

courseRouter.get("/", CourseController.getAllCourseOfAdmin);

export default courseRouter;
