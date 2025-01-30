import { Request, Response, NextFunction } from "express";
import LessonRepository from "../../infrastructures/database/repositories/LessonRepository";
import CreateLessonUseCase from "../../application/use_cases/lesson/CreateLessonUseCase";
import GetAllLessonsOfMentorUseCase from "../../application/use_cases/lesson/GetAllLessonofMentorUseCase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import Lesson from "../../application/entities/Lesson";
import GetLessonByIdUseCase from "../../application/use_cases/lesson/GetLessonByIdUseCase";
import UpdateLessonByIdUseCase from "../../application/use_cases/lesson/UpdateLessonByIdUseCase";
import DeleteLessonByIdUseCase from "../../application/use_cases/lesson/DeleteLessonByIdUseCase";
const lessonRepository = new LessonRepository();
const courseRepository = new CourseRepository();
// const getAllLessonsOfCourse = new GetAllLessonsOfCourseUseCase(
//   lessonRepository
// );

const createLessonUseCase = new CreateLessonUseCase(
  lessonRepository,
  courseRepository
);

const getAllLessonsOfMentorUseCase = new GetAllLessonsOfMentorUseCase(
  lessonRepository
);

const getLessonByIdUseCase = new GetLessonByIdUseCase(lessonRepository);

const updateLessonByIdUseCase = new UpdateLessonByIdUseCase(lessonRepository);

const deleteLessonByIdUseCase = new DeleteLessonByIdUseCase(lessonRepository);

class LessonController {
  async createLessonForMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const data = req.body;
      const response = await createLessonUseCase.execute(data, mentorId);
      if (response.success && response.data) {
        const { lesson } = response.data as {
          lesson: Lesson;
        };
        res.status(201).json({ message: response.message, data: lesson });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async updateLessonOfMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const data = req.body;
      const { lessonId } = req.params;
      const response = await updateLessonByIdUseCase.execute(data, lessonId);
      if (response.success && response.data) {
        const { lesson } = response.data as {
          lesson: Lesson;
        };
        res.status(200).json({ message: response.message, data: lesson });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async getAllLessonsOfMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const response = await getAllLessonsOfMentorUseCase.execute(mentorId);
      if (response.success && response.data) {
        const { lessons } = response.data as { lessons: Lesson[] };
        res.status(200).json({ message: response.message, data: lessons });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const { lessonId } = req.params;
      const response = await getLessonByIdUseCase.execute(lessonId);
      if (response.success && response.data) {
        const { lesson } = response.data as { lesson: Lesson };
        res.status(200).json({ message: response.message, data: lesson });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteLessonOfMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const { lessonId } = req.params;
      const response = await deleteLessonByIdUseCase.execute(lessonId);
      if (response.success && response.data) {
        const { lesson } = response.data as { lesson: Lesson };
        res.status(200).json({ message: response.message, data: lesson });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new LessonController();
