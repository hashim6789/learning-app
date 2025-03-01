//imported dtos for check the body credentials
//imported the entities
//imported the repositories
//imported the use cases
//created the instances
//mentor controller
//mentor signup

import { Request, Response, NextFunction } from "express";
import LessonRepository from "../../infrastructures/database/repositories/lesson.reposiotory";
import CreateLessonUseCase from "../../application/use_cases/lesson/lesson-create.usecase";
import GetAllLessonsOfMentorUseCase from "../../application/use_cases/lesson/lessons-get-all-mentor.usecase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import Lesson from "../../application/entities/lesson.entity";
import GetLessonByIdUseCase from "../../application/use_cases/lesson/lesson-get.usecase";
import UpdateLessonByIdUseCase from "../../application/use_cases/lesson/lesson-update.usecase";
import DeleteLessonByIdUseCase from "../../application/use_cases/lesson/lesson-delete.usecase";
import GetMaterialsByLessonIdUseCase from "../../application/use_cases/lesson/materials-get-all-lesson.usecase";
import MaterialRepository from "../../infrastructures/database/repositories/MaterialRepository";
import Material from "../../application/entities/material.entity";
const lessonRepository = new LessonRepository();
const courseRepository = new CourseRepository();
const materialRepository = new MaterialRepository();
// const getAllLessonsOfCourse = new GetAllLessonsOfCourseUseCase(
//   lessonRepository
// );

const createLessonUseCase = new CreateLessonUseCase(lessonRepository);

const getAllLessonsOfMentorUseCase = new GetAllLessonsOfMentorUseCase(
  lessonRepository
);

const getMaterialsByLessonIdUseCase = new GetMaterialsByLessonIdUseCase(
  lessonRepository,
  materialRepository
);

const getLessonByIdUseCase = new GetLessonByIdUseCase(lessonRepository);

const updateLessonByIdUseCase = new UpdateLessonByIdUseCase(lessonRepository);

const deleteLessonByIdUseCase = new DeleteLessonByIdUseCase(lessonRepository);

class LessonController {
  async createLesson(req: Request, res: Response, next: NextFunction) {
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
  async updateLesson(req: Request, res: Response, next: NextFunction) {
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
  async getAllLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const { search = "", page = "1", limit = "10" } = req.query as any;
      const mentorId = req.user?.userId || "";
      const response = await getAllLessonsOfMentorUseCase.execute(mentorId, {
        search,
        page,
        limit,
      });
      if (response.success && response.data) {
        const { lessons, docCount } = response.data as {
          lessons: Lesson[];
          docCount: number;
        };
        res
          .status(200)
          .json({ message: response.message, data: lessons, docCount });
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
  async deleteLesson(req: Request, res: Response, next: NextFunction) {
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
  async getMaterialsByLessonId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mentorId = req.user?.userId || "";
      const { lessonId } = req.params;
      const response = await getMaterialsByLessonIdUseCase.execute(lessonId);
      type Data = { materials: Material[]; docCount: number };

      if (response.success && response.data) {
        const { materials, docCount } = response.data as Data;
        res
          .status(200)
          .json({ message: response.message, data: materials, docCount });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default LessonController;
