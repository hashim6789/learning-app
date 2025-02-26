import { Request, Response, NextFunction } from "express";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import GetMentorAnalysisUseCase from "../../application/use_cases/analysis/mentor-get-analysis.usecase";
import { HttpResponse } from "../../shared/constants/response-message.constant";
import { HttpStatus } from "../../shared/constants/response-status.contant";
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
          .status(HttpStatus.OK)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AnalysisController;
