// src/adapters/controllers/SlotController.ts
import { Request, Response, NextFunction } from "express";
import SlotRepository from "../../infrastructures/database/repositories/slot.reoisitory";
import AddSlotUseCase from "../../application/use_cases/meet/slot.add.usecase";
import { CreateSlotDTO } from "../../shared/dtos/CreateSlotDTO";
import GetSlotsOfMentorUseCase from "../../application/use_cases/meet/slot-get-all-mentor.usecase";

const slotRepository = new SlotRepository();

const addSlotUseCase = new AddSlotUseCase(slotRepository);

const getAllSlotsOfMentor = new GetSlotsOfMentorUseCase(slotRepository);

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
}
