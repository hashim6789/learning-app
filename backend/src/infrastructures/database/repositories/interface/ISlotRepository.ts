import { Slot } from "../../../../application/entities/slot.entiry";
import { CreateSlotDTO } from "../../../../shared/dtos/CreateSlotDTO";

export interface ISlotRepository {
  createSlot(slotData: CreateSlotDTO): Promise<Slot>;
  getAvailableSlots(): Promise<Slot[]>;
  getSlotsByMentor(mentorId: string): Promise<Slot[]>;
  getSlotsByCourse(courseId: string): Promise<Slot[]>;
  getSlotById(slotId: string): Promise<Slot | null>;
  bookSlot(slotId: string): Promise<Slot | null>;
  deleteSlot(slotId: string): Promise<Slot | null>;
}
