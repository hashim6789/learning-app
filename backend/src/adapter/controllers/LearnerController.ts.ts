import { Request, Response, NextFunction } from "express";
import { IGetLearnersUseCase } from "../IUseCases/admin/IGetLearnersUseCase";
import { IBlockUnblockLearnerUseCase } from "../IUseCases/admin/IBlockUnblockLearnerUseCase";
import { IGetLearnerByIdUseCase } from "../IUseCases/admin/IGetLearnerByIdUseCase";

class LearnerController {
  private getLearnersUseCase: IGetLearnersUseCase;
  private blockUnblockLearnerUseCase: IBlockUnblockLearnerUseCase;
  private getLearnerByIdUseCase: IGetLearnerByIdUseCase;

  constructor(
    getLearnersUseCase: IGetLearnersUseCase,
    blockUnblockLearnerUseCase: IBlockUnblockLearnerUseCase,
    getLearnerByIdUseCase: IGetLearnerByIdUseCase
  ) {
    this.getLearnersUseCase = getLearnersUseCase;
    this.blockUnblockLearnerUseCase = blockUnblockLearnerUseCase;
    this.getLearnerByIdUseCase = getLearnerByIdUseCase;
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

  async getLearnerForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { learnerId } = req.params;
      const response = await this.getLearnerByIdUseCase.execute(learnerId);
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
