import { Request, Response, NextFunction } from "express";
import GetMentorsUseCase from "../../application/use_cases/admin/GetMentorsUseCase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import BlockUnblockMentorUseCase from "../../application/use_cases/admin/BlockUnBlockMentorUseCase";
import { IGetMentorsUseCase } from "../IUseCases/admin/IGetMentorUseCase";
import { IBlockUnBlockMentorUseCase } from "../IUseCases/admin/IBlockUnblockMentorUseCase";

const mentorRepository = new MentorRepository();
const getMentorUseCase = new GetMentorsUseCase(mentorRepository);
const blockUnblockMentorUseCase = new BlockUnblockMentorUseCase(
  mentorRepository
);

class MentorController {
  private getMentorUseCase: IGetMentorsUseCase;
  private blockUnblockMentorUseCase: IBlockUnBlockMentorUseCase;

  constructor(
    getMentorUseCase: IGetMentorsUseCase,
    blockUnblockMentorUseCase: IBlockUnBlockMentorUseCase
  ) {
    this.getMentorUseCase = getMentorUseCase;
    this.blockUnblockMentorUseCase = blockUnblockMentorUseCase;
  }

  async fetchAllMentorsForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.getMentorUseCase.execute();
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
      const response = await this.blockUnblockMentorUseCase.execute(
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
}

export default MentorController;
