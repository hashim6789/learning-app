//imported dtos for check the body credentials
//imported the entities
//imported the repositories
//imported the use cases
//created the instances
//mentor controller
//mentor signup

import { Request, Response, NextFunction } from "express";
import GetMentorsUseCase from "../../application/use_cases/admin/mentor-get-all.usecase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import BlockUnblockMentorUseCase from "../../application/use_cases/admin/mentor-block-unblock.usecase";
import GetMentorByIdUseCase from "../../application/use_cases/admin/mentor-get.usecase";
// import GetMentorCoursesAnalyticsUseCase from "../../application/use_cases/course/GetMentorCoursesAnalyticsUseCase";
import CourseRepository from "../../infrastructures/database/repositories/CourseRepository";
import { Mentor } from "../../application/entities/mentor.entity";
const mentorRepository = new MentorRepository();
const courseRepository = new CourseRepository();
const getMentorsUseCase = new GetMentorsUseCase(mentorRepository);
const getMentorByIdUseCase = new GetMentorByIdUseCase(mentorRepository);
const blockUnblockMentorUseCase = new BlockUnblockMentorUseCase(
  mentorRepository
);
// const getMentorCoursesAnalyticsUseCase = new GetMentorCoursesAnalyticsUseCase(
//   mentorRepository,
//   courseRepository
// );

class MentorController {
  //get all mentors
  async getAllMentors(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        status = "all",
        search = "",
        page = "1",
        limit = "10",
      } = req.query as any;
      const query = {
        status,
        search,
        page,
        limit,
      };
      const response = await getMentorsUseCase.execute(query);

      type Data = { mentors: Mentor[]; docCount: number };
      if (response.success && response.data) {
        const { mentors, docCount } = response.data as Data;
        res.status(200).json({
          message: response.message,
          data: mentors,
          docCount,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //get mentor
  async getMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const { mentorId } = req.params;
      const response = await getMentorByIdUseCase.execute(mentorId);
      if (response.success && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //block and unblock the mentor
  async blockUnblockMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const { mentorId } = req.params;
      const response = await blockUnblockMentorUseCase.execute(
        mentorId,
        req.body
      );
      if (response.success && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  // async getMentorCoursesAnalytics(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const { mentorId } = req.params;
  //     const response = await getMentorCoursesAnalyticsUseCase.execute(mentorId);
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

export default MentorController;
