import { Request, Response, NextFunction } from "express";
import GetLearnersUseCase from "../../application/use_cases/admin/GetLearnersUseCase";
import LearnerRepository from "../../infrastructures/database/repositories/learner/LearnerRepository";
import BlockUnblockLearnerUseCase from "../../application/use_cases/admin/BlockUnblockLearnerUseCase";

const learnerRepository = new LearnerRepository();
const getLearnersUseCase = new GetLearnersUseCase(learnerRepository);
const blockUnblockLearnerUseCase = new BlockUnblockLearnerUseCase(
  learnerRepository
);

class LearnerController {
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

export default new LearnerController();
