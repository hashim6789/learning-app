import { Request, Response, NextFunction } from "express";

//imported the repositories
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import GroupChatRepository from "../../infrastructures/database/repositories/GroupChatRepository";

//imported the use cases
import CourseCreationUseCase from "../../application/use_cases/course/course-create.usecase";
import GetAllCourseOfMentorUseCase from "../../application/use_cases/mentor/courses-get-all-mentor.usecase";
import GetAllCourseUseCase from "../../application/use_cases/admin/courses-get-all.usecase";
import GetCourseOfMentorUseCase from "../../application/use_cases/mentor/course-get-mentor.usecase";
import UpdateCourseUseCase from "../../application/use_cases/mentor/course-update.usecase";
import DeleteCourseUseCase from "../../application/use_cases/mentor/course-delete.usecase";
import UpdateCourseStatusUseCase from "../../application/use_cases/course/course-update-status.usecase";
import GetCourseByIdUseCase from "../../application/use_cases/course/course-get.usecase";
// import GetMentorCoursesAnalyticsUseCase from "../../application/use_cases/course/GetMentorCoursesAnalyticsUseCase";
import GetAllPublishedCoursesUseCase from "../../application/use_cases/course/course-get-all-published.usecase";
import { CourseQuery } from "../../shared/types/filters";
import { Payload } from "../../shared/types/Payload";
import { ResponseModel } from "../../shared/types/ResponseModel";
import Course from "../../application/entities/course.entity";
import { NotificationService } from "../../infrastructures/services/NotificationService";
import { NotificationRepository } from "../../infrastructures/database/repositories/NotificatinRepository";

//created the instances
const mentorRepository = new MentorRepository();
const courseRepository = new CourseRepository();
const groupChatRepository = new GroupChatRepository();
const notificationRepository = new NotificationRepository();

const notificationService = new NotificationService(notificationRepository);
const courseCreationUseCase = new CourseCreationUseCase(
  courseRepository,
  mentorRepository
);

const getAllCourseOfMentorUseCase = new GetAllCourseOfMentorUseCase(
  courseRepository,
  mentorRepository
);

const getAllCourseUseCase = new GetAllCourseUseCase(courseRepository);

// const getAllLessonsOfCourseUseCase = new GetAllLessonsOfCourseUseCase(
//   lessonRepository
// );

const getCourseOfMentorUseCase = new GetCourseOfMentorUseCase(
  courseRepository,
  mentorRepository
);

const updatedCourseUseCase = new UpdateCourseUseCase(courseRepository);
const deleteCourseUseCase = new DeleteCourseUseCase(courseRepository);

const updateCourseStatusUseCase = new UpdateCourseStatusUseCase(
  courseRepository,
  notificationService,
  groupChatRepository
);

const getCourseByIdUseCase = new GetCourseByIdUseCase(courseRepository);

const getAllPublishedCoursesUseCase = new GetAllPublishedCoursesUseCase(
  courseRepository
);

//Course controller
class CourseController {
  //create course
  async createCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.user?.userId || "";
      const data = req.body;
      const response = await courseCreationUseCase.execute({
        ...data,
        mentorId,
      });

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

  //update course
  async updateCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.user?.userId || "";
      const { courseId } = req.params;
      const course = { ...req.body };
      console.log(course);
      const response = await updatedCourseUseCase.execute(courseId, course);

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

  //delete course
  async deleteCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.user?.userId || "";
      const { courseId } = req.params;
      const response = await deleteCourseUseCase.execute(courseId);

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

  //update course
  async updateCourseStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const userRole = req.user?.role || "learner";
      const { courseId } = req.params;
      const { newStatus } = req.body;
      const response = await updateCourseStatusUseCase.execute(
        courseId,
        newStatus,
        userId,
        userRole
      );

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

  //get all courses of the mentor
  async getAllCourses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.user?.userId || "";

      const {
        status = "all",
        search = "",
        page = "1",
        limit = "10",
      } = req.query as any;

      const filter = {
        status,
        search,
        page,
        limit,
      };
      const response = await getAllCourseOfMentorUseCase.execute(
        mentorId,
        filter
      );
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

  //get mentor all courses of the mentor
  // async getMentorCoursesAnalytics(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const userId = req.user?.userId || "";
  //     const { mentorId } = req.params;
  //     // const response = await getAllCourseOfMentorUseCase.execute(mentorId);
  //     // if (response.success && response.data) {
  //     //   res
  //     //     .status(200)
  //     //     .json({ message: response.message, data: response.data });
  //     // } else {
  //     //   res.status(400).json({ message: response.message });
  //     // }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  //get a course of mentor
  async AuthorizedGetCourse(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const userId = req.user?.userId;
      const role = req.user?.role || "learner";

      let response: ResponseModel = {
        statusCode: 400,
        success: false,
        message: "",
      };

      if (!userId) {
        // response = await getAllPublishedCoursesUseCase.execute(filter);
      } else if (role === "admin") {
        response = await getCourseByIdUseCase.execute(courseId);
      } else if (role === "mentor") {
        response = await getCourseOfMentorUseCase.execute(userId, courseId);
      }

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

  //get all created courses
  // async getAllCourseOfAdmin(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const response = await getAllCourseUseCase.execute();
  //     if (response.success && response.data) {
  //       res
  //         .status(200)
  //         .json({ message: response.message, data: response.data });
  //     } else {
  //       res.status(400).json({ message: response.message });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  //get course by id
  async getCourseById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;

      const response = await getCourseByIdUseCase.execute(courseId);
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
  //get all published courses
  async getCourses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
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

      if (!userId || role === "learner") {
        response = await getAllPublishedCoursesUseCase.execute(filter);
      } else if (role === "admin") {
        response = await getAllCourseUseCase.execute(filter);
      } else if (role === "mentor") {
        response = await getAllCourseOfMentorUseCase.execute(userId, filter);
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
  //get all published courses
  async getCourseForLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const {
      //   category = "all",
      //   search = "",
      //   page = "1",
      //   limit = "10",
      // } = req.query as any;
      const { courseId } = req.params;
      const response = await getCourseByIdUseCase.execute(courseId);
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

  // async getLessonsOfCourseForMentor(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const { courseId } = req.params;
  //     const mentorId = req.user?.userId || "";
  //     const response = await getL.execute(courseId);
  //     if (response.success && response.data) {
  //       res
  //         .status(200)
  //         .json({ message: response.message, data: response.data });
  //     } else {
  //       res.status(400).json({ message: response.message });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default CourseController;
