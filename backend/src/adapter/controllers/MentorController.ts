//imported dtos for check the body credentials
//imported the entities
//imported the repositories
//imported the use cases
//created the instances
//mentor controller
//mentor signup

import { Request, Response, NextFunction } from "express";
import GetMentorsUseCase from "../../application/use_cases/admin/GetMentorsUseCase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import BlockUnblockMentorUseCase from "../../application/use_cases/admin/BlockUnBlockMentorUseCase";
import GetMentorByIdUseCase from "../../application/use_cases/admin/GetMentorByIdUseCase";
import GetMentorCoursesAnalyticsUseCase from "../../application/use_cases/course/GetMentorCoursesAnalyticsUseCase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
const mentorRepository = new MentorRepository();
const courseRepository = new CourseRepository();
const getMentorsUseCase = new GetMentorsUseCase(mentorRepository);
const getMentorByIdUseCase = new GetMentorByIdUseCase(mentorRepository);
const blockUnblockMentorUseCase = new BlockUnblockMentorUseCase(
  mentorRepository
);
const getMentorCoursesAnalyticsUseCase = new GetMentorCoursesAnalyticsUseCase(
  mentorRepository,
  courseRepository
);

class MentorController {
  async fetchAllMentorsForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await getMentorsUseCase.execute();
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
  async fetchMentorForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { mentorId } = req.params;
      const response = await getMentorByIdUseCase.execute(mentorId);
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

  async blockUnblockMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const { mentorId } = req.params;
      const response = await blockUnblockMentorUseCase.execute(
        mentorId,
        req.body
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
  async getMentorCoursesAnalytics(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { mentorId } = req.params;
      const response = await getMentorCoursesAnalyticsUseCase.execute(mentorId);
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

export default MentorController;
