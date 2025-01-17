import { Request, Response, NextFunction } from "express";
import GetMentorsUseCase from "../../application/use_cases/admin/GetMentorsUseCase";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import BlockUnblockMentorUseCase from "../../application/use_cases/admin/BlockUnBlockMentorUseCase";
import { IGetMentorsUseCase } from "../IUseCases/admin/IGetMentorUseCase";
import { IBlockUnBlockMentorUseCase } from "../IUseCases/admin/IBlockUnblockMentorUseCase";
import { IGetMentorByIdUseCase } from "../IUseCases/admin/IGetMentorByIdUseCase";

const mentorRepository = new MentorRepository();
const getMentorUseCase = new GetMentorsUseCase(mentorRepository);
const blockUnblockMentorUseCase = new BlockUnblockMentorUseCase(
  mentorRepository
);

class MentorController {
  private getMentorsUseCase: IGetMentorsUseCase;
  private blockUnblockMentorUseCase: IBlockUnBlockMentorUseCase;
  private getMentorByIdUseCase: IGetMentorByIdUseCase;

  constructor(
    getMentorsUseCase: IGetMentorsUseCase,
    blockUnblockMentorUseCase: IBlockUnBlockMentorUseCase,
    getMentorByIdUseCase: IGetMentorByIdUseCase
  ) {
    this.getMentorsUseCase = getMentorsUseCase;
    this.blockUnblockMentorUseCase = blockUnblockMentorUseCase;
    this.getMentorByIdUseCase = getMentorByIdUseCase;
  }

  async fetchAllMentorsForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await this.getMentorsUseCase.execute();
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
  async fetchMentorForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { mentorId } = req.params;
      const response = await this.getMentorByIdUseCase.execute(mentorId);
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
