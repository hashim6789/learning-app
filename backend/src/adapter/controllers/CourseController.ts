import { Request, Response, NextFunction } from "express";
import CourseCreationUseCase from "../../application/use_cases/mentor/CourseCreationUseCase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import GetAllCourseOfMentorUseCase from "../../application/use_cases/mentor/GetAllCoursesOfMentorUseCase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import GetAllCourseUseCase from "../../application/use_cases/admin/GetAllCourses";
import GetAllLessonsOfCourseUseCase from "../../application/use_cases/mentor/GetAllLessonOfCourseUseCase";
import LessonRepository from "../../infrastructures/database/repositories/LessonRepository";
import GetCourseOfMentorUseCase from "../../application/use_cases/mentor/GetCourseByIdUseCase";

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

const getAllLessonsOfCourseUseCase = new GetAllLessonsOfCourseUseCase(
  lessonRepository
);

const getCourseOfMentorUseCase = new GetCourseOfMentorUseCase(
  courseRepository,
  mentorRepository
);

class CourseController {
  async createCourseForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = "";
      const response = await courseCreationUseCase.execute({
        ...req.body,
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

  async getAllCourseOfMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = "";
      const response = await getAllCourseOfMentorUseCase.execute(
        // req.user?.userId
        mentorId
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

  async getCourseOfMentorByCourseId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { courseId } = req.params;
      const mentorId = "";
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
      const { courseId } = req.params;
      const response = await getAllLessonsOfCourseUseCase.execute(courseId);
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

export default new CourseController();
