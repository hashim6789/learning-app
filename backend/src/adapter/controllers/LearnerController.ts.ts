import { Request, Response, NextFunction } from "express";

//imported the repositories
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";

//imported the use cases
import GetLearnersUseCase from "../../application/use_cases/learner/GetLearnersUseCase";
import BlockUnblockLearnerUseCase from "../../application/use_cases/learner/BlockUnblockLearnerUseCase";
import GetLearnerByIdUseCase from "../../application/use_cases/learner/GetLearnerByIdUseCase";
import { Learner } from "../../application/entities/Learner";

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
  async getAllLearners(req: Request, res: Response, next: NextFunction) {
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
      const response = await getLearnersUseCase.execute(query);

      type Data = { learners: Learner[]; docCount: number };
      if (response.success && response.data) {
        const { learners, docCount } = response.data as Data;
        res.status(200).json({
          message: response.message,
          data: learners,
          docCount,
        });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //get learner
  async getLearner(req: Request, res: Response, next: NextFunction) {
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
