import { ObjectId } from "mongoose";
import { ISlot } from "../../interfaces/ISlot";
import { CreateSlotDTO } from "../../../../shared/dtos/CreateSlotDTO";

export interface ISlotRepository {
  createSlot(slotData: CreateSlotDTO): Promise<ISlot>;
  getAvailableSlots(): Promise<ISlot[]>;
  getSlotsByMentor(mentorId: string): Promise<ISlot[]>;
  getSlotById(slotId: ObjectId): Promise<ISlot | null>;
  bookSlot(slotId: ObjectId): Promise<ISlot | null>;
  deleteSlot(slotId: ObjectId): Promise<ISlot | null>;
}
