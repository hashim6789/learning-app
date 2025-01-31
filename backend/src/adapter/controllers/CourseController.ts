import { Request, Response, NextFunction } from "express";
import CourseCreationUseCase from "../../application/use_cases/mentor/CourseCreationUseCase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import GetAllCourseOfMentorUseCase from "../../application/use_cases/mentor/GetAllCoursesOfMentorUseCase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import GetAllCourseUseCase from "../../application/use_cases/admin/GetAllCourses";
// import GetAllLessonsOfCourseUseCase from "../../application/use_cases/mentor/GetAllLessonOfCourseUseCase";
import LessonRepository from "../../infrastructures/database/repositories/LessonRepository";
import GetCourseOfMentorUseCase from "../../application/use_cases/mentor/GetCourseByIdUseCase";
import UpdateCourseUseCase from "../../application/use_cases/mentor/UpdateCourseUseCase";
import DeleteCourseUseCase from "../../application/use_cases/mentor/DeleteCourseUseCase";

const mentorRepository = new MentorRepository();
const courseRepository = new CourseRepository();
const lessonRepository = new LessonRepository();
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

class CourseController {
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
  async getLessonsOfCourseForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const { courseId } = req.params;
      // const mentorId = req.user?.userId || "";
      // const response = await getAllLessonsOfCourseUseCase.execute(courseId);
      // if (response.success && response.data) {
      //   res
      //     .status(200)
      //     .json({ message: response.message, data: response.data });
      // } else {
      //   res.status(400).json({ message: response.message });
      // }
    } catch (error) {
      next(error);
    }
  }
}

export default CourseController;
