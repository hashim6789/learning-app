import { Request, Response, NextFunction } from "express";
import LessonRepository from "../../infrastructures/database/repositories/LessonRepository";
import GetAllLessonsOfCourseUseCase from "../../application/use_cases/mentor/GetAllLessonOfCourseUseCase";
import CreateLessonUseCase from "../../application/use_cases/mentor/CreateLessonUseCase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
const lessonRepository = new LessonRepository();
const courseRepository = new CourseRepository();
// const getAllLessonsOfCourse = new GetAllLessonsOfCourseUseCase(
//   lessonRepository
// );

const createLessonUseCase = new CreateLessonUseCase(
  lessonRepository,
  courseRepository
);

class LessonController {
  async createLessonForMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await createLessonUseCase.execute(req.body);
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
  //   async getAllLessonsOfCourse(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const response = await getAllLessonsOfCourse.execute({
  //         ...req.body,
  //         mentorId: req.user?.userId,
  //       });

  //       if (response.success && response.data) {
  //         res
  //           .status(200)
  //           .json({ message: response.message, data: response.data });
  //       } else {
  //         res.status(400).json({ message: response.message });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

export default new LessonController();
