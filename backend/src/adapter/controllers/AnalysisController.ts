//imported dtos for check the body credentials
//imported the entities
//imported the repositories
//imported the use cases
//created the instances
//mentor controller
//mentor signup

import { Request, Response, NextFunction } from "express";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import GetMentorAnalysisUseCase from "../../application/use_cases/analysis/GetMentorAnalysisUseCase";
const mentorRepository = new MentorRepository();
const courseRepository = new CourseRepository();

const getMentorCoursesAnalyticsUseCase = new GetMentorAnalysisUseCase(
  courseRepository,
  mentorRepository
);

class AnalysisController {
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

export default AnalysisController;
