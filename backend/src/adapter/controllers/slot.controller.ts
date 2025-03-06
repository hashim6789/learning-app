// src/adapters/controllers/SlotController.ts
import { Request, Response, NextFunction } from "express";
import SlotRepository from "../../infrastructures/database/repositories/slot.reoisitory";
import AddSlotUseCase from "../../application/use_cases/meet/slot.add.usecase";
import { CreateSlotDTO } from "../../shared/dtos/CreateSlotDTO";
import GetSlotsOfMentorUseCase from "../../application/use_cases/meet/slot-get-all-mentor.usecase";
import BookSlotUseCase from "../../application/use_cases/meet/slot-book.usecase";
import MeetingRepository from "../../infrastructures/database/repositories/MeetingRepository";

const slotRepository = new SlotRepository();
const meetRepository = new MeetingRepository();

const addSlotUseCase = new AddSlotUseCase(slotRepository);

const getAllSlotsOfMentor = new GetSlotsOfMentorUseCase(slotRepository);

const bookSlotUseCase = new BookSlotUseCase(slotRepository, meetRepository);

export class SlotController {
  constructor() {}

  async addSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const data: CreateSlotDTO = req.body;
      const response = await addSlotUseCase.execute(data, userId);
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
  async getSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const response = await getAllSlotsOfMentor.execute(userId);
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
  async getSlotsOfLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { mentorId } = req.params;
      const response = await getAllSlotsOfMentor.execute(mentorId);
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
  async bookSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slotId } = req.params;
      const userId = req.user?.userId || "";
      const { courseId } = req.body;
      const response = await bookSlotUseCase.execute(userId, slotId, courseId);
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
