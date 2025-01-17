import { Request, Response, NextFunction } from "express";
// import GetLearnersUseCase from "../../application/use_cases/admin/GetLearnersUseCase";
// import LearnerRepository from "../../infrastructures/database/repositories/learner/LearnerRepository";
import { IGetLearnersUseCase } from "../IUseCases/admin/IGetLearnerUseCase";
import { IBlockUnblockLearnerUseCase } from "../IUseCases/admin/IBlockUnblockLearnerUseCase";
// import BlockUnblockLearnerUseCase from "../../application/use_cases/admin/BlockUnblockLearnerUseCase";

// const learnerRepository = new LearnerRepository();

class LearnerController {
  private getLearnersUseCase: IGetLearnersUseCase;
  private blockUnblockLearnerUseCase: IBlockUnblockLearnerUseCase;

  constructor(
    getLearnersUseCase: IGetLearnersUseCase,
    blockUnblockLearnerUseCase: IBlockUnblockLearnerUseCase
  ) {
    this.getLearnersUseCase = getLearnersUseCase;
    this.blockUnblockLearnerUseCase = blockUnblockLearnerUseCase;
  }
  async getAllLearnersForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.getLearnersUseCase.execute();
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
      const response = await this.blockUnblockLearnerUseCase.execute(
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
