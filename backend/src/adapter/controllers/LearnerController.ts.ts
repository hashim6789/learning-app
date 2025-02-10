import { Request, Response, NextFunction } from "express";

//imported the repositories
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";

//imported the use cases
import GetLearnersUseCase from "../../application/use_cases/admin/GetLearnersUseCase";
import BlockUnblockLearnerUseCase from "../../application/use_cases/admin/BlockUnblockLearnerUseCase";
import GetLearnerByIdUseCase from "../../application/use_cases/admin/GetLearnerByIdUseCase";

//created the instances
const learnerRepository = new LearnerRepository();
const getLearnersUseCase = new GetLearnersUseCase(learnerRepository);
const blockUnblockLearnerUseCase = new BlockUnblockLearnerUseCase(
  learnerRepository
);
const getLearnerByIdUseCase = new GetLearnerByIdUseCase(learnerRepository);

//Learner controller
class LearnerController {
  //get all learners
  async getAllLearnersForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await getLearnersUseCase.execute();
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

  //get learner
  async getLearnerForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { learnerId } = req.params;
      const response = await getLearnerByIdUseCase.execute(learnerId);
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

  //block and unblock the learner
  async blockUnblockLearner(req: Request, res: Response, next: NextFunction) {
    try {
      const { learnerId } = req.params;
      const response = await blockUnblockLearnerUseCase.execute(
        learnerId,
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
}

export default LearnerController;
