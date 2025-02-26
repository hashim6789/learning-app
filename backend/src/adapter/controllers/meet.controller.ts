import { Request, Response, NextFunction } from "express";
import MeetingRepository from "../../infrastructures/database/repositories/MeetingRepository";
import MeetStartUseCase from "../../application/use_cases/meet/meet-start.usecase";

//imported the repositories
const meetRepository = new MeetingRepository();

const meetStartUseCase = new MeetStartUseCase(meetRepository);

//imported the use cases

//created the instances

//mentor controller
class MeetController {
  //get all published courses
  async startMeet(req: Request, res: Response, next: NextFunction) {
    try {
      const meetId = "67bdb1d6000ac9b2a97fd13c";
      //   const {meetId} = req.params;
      const response = await meetStartUseCase.execute(meetId);
      if (response && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: response.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async acceptMeet(req: Request, res: Response, next: NextFunction) {
    try {
      const meetId = "67bdb1d6000ac9b2a97fd13c";
      //   const {meetId} = req.params;
      const response = await meetStartUseCase.execute(meetId);
      if (response && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: response.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async declineMeet(req: Request, res: Response, next: NextFunction) {
    try {
      const { meetId } = req.params;
      const response = await meetStartUseCase.execute(meetId);
      if (response && response.data) {
        res.status(200).json({
          message: response.message,
          data: response.data,
        });
      } else {
        res.status(400).json({
          message: response.message,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  //get published courses
  //get published courses
}

export default MeetController;
