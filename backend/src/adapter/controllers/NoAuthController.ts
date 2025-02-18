import { Request, Response, NextFunction } from "express";

//imported the repositories
import CategoryRepository from "../../infrastructures/database/repositories/CategoryRepository";

//imported the use cases
import GetCategoriesUseCase from "../../application/use_cases/admin/GetCategoriesUseCase";
import CreateCategoryUseCase from "../../application/use_cases/admin/CreateCategoryUseCase";
import ListUnListCategoryUseCase from "../../application/use_cases/admin/ListUnlistCategoryUseCase";
import UpdateCategoryUseCase from "../../application/use_cases/admin/UpdateCategoryUseCase";
import { ResponseModel } from "../../shared/types/ResponseModel";
import Course from "../../application/entities/Course";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import GetAllPublishedCoursesUseCase from "../../application/use_cases/course/GetAllPublishedCoursesUseCase";
import GetPublishedCourseUseCase from "../../application/use_cases/course/GetPublishedcourseUseCase";
import GetAllPlansUseCase from "../../application/use_cases/plans/GetAllPlansUseCase";
import SubscriptionPlanRepository from "../../infrastructures/database/repositories/SubscriptionPlanRepository";

//created the instances
const courseRepository = new CourseRepository();

const getAllPublishedCoursesUseCase = new GetAllPublishedCoursesUseCase(
  courseRepository
);

const getPublishedCourseUseCase = new GetPublishedCourseUseCase(
  courseRepository
);

const subscriptionPlanRepository = new SubscriptionPlanRepository();

const getAllPlansUseCase = new GetAllPlansUseCase(subscriptionPlanRepository);

//mentor controller
class NoAuthController {
  //get all published courses
  async getCourses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const role = req.user?.role || "learner";

      type Data = { courses: Course[]; docCount: number };

      const {
        category = "all",
        search = "",
        status = "all",
        page = "1",
        limit = "10",
      } = req.query as any;

      const filter = {
        category,
        search,
        status,
        page,
        limit,
      };

      let response: ResponseModel = {
        statusCode: 400,
        success: false,
        message: "",
      };

      if (role === "learner") {
        response = await getAllPublishedCoursesUseCase.execute(filter);
      }

      const { courses, docCount } = response.data as Data;

      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: courses, docCount });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //get published courses
  async getPublishedCourseById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const response = await getPublishedCourseUseCase.execute(courseId);
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  //get published courses
  async getAllSubscriptionPlans(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await getAllPlansUseCase.execute();
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default NoAuthController;
