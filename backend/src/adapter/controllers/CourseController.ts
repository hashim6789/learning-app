import { Request, Response, NextFunction } from "express";

//imported the repositories
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

//imported the use cases
import CourseCreationUseCase from "../../application/use_cases/mentor/CourseCreationUseCase";
import GetAllCourseOfMentorUseCase from "../../application/use_cases/mentor/GetAllCoursesOfMentorUseCase";
import GetAllCourseUseCase from "../../application/use_cases/admin/GetAllCourses";
import GetCourseOfMentorUseCase from "../../application/use_cases/mentor/GetCourseByIdUseCase";
import UpdateCourseUseCase from "../../application/use_cases/mentor/UpdateCourseUseCase";
import DeleteCourseUseCase from "../../application/use_cases/mentor/DeleteCourseUseCase";
import UpdateCourseStatusUseCase from "../../application/use_cases/course/UpdateCourseStatusUseCase";
import GetCourseByIdUseCase from "../../application/use_cases/course/GetCourseByIdUseCase";
import GetMentorCoursesAnalyticsUseCase from "../../application/use_cases/course/GetMentorCoursesAnalyticsUseCase";

//created the instances
const mentorRepository = new MentorRepository();
const courseRepository = new CourseRepository();
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
  courseRepository
);

const getCourseByIdUseCase = new GetCourseByIdUseCase(courseRepository);

//Course controller
class CourseController {
  //create course
  async createCourseForMentor(
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
  async updateCourseForMentor(
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
  async deleteCourseForMentor(
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
      const mentorId = req.user?.userId || "";
      const userRole = req.user?.role || "learner";
      const { courseId } = req.params;
      const { newStatus } = req.body;
      const response = await updateCourseStatusUseCase.execute(
        courseId,
        newStatus,
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
  async getAllCourseOfMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.user?.userId || "";
      const response = await getAllCourseOfMentorUseCase.execute(mentorId);
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
  async getCourseOfMentorByCourseId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const mentorId = req.user?.userId || "";
      const response = await getCourseOfMentorUseCase.execute(
        mentorId,
        courseId
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

  //get all created courses
  async getAllCourseOfAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await getAllCourseUseCase.execute();
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
