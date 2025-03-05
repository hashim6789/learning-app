import { ISlot } from "../interfaces/ISlot";
import { ObjectId } from "mongoose";
import SlotModel from "../models/slots.model";
import { ISlotRepository } from "./interface/ISlotRepository";
import { CreateSlotDTO } from "../../../shared/dtos/CreateSlotDTO";

class SlotRepository implements ISlotRepository {
  /**
   * Create a new slot
   * @param slotData ISlot
   * @returns Created Slot Document
   */
  async createSlot(slotData: CreateSlotDTO): Promise<ISlot> {
    console.log("Received Slot Data:", slotData); // Debugging output
    const dateTime = new Date(`${slotData.date}T${slotData.time}:00Z`);

    const slot = new SlotModel({
      mentorId: slotData.mentorId,
      duration: slotData.duration,
      dateTime,
    });
    const newSlot = await SlotModel.create(slot);
    return newSlot;
  }

  /**
   * Get all available slots (not booked)
   * @returns List of available slots
   */
  async getAvailableSlots(): Promise<ISlot[]> {
    return await SlotModel.find({ isBooked: false }).populate("mentorId");
  }

  /**
   * Get slots by Mentor ID
   * @param mentorId Mentor's ObjectId
   * @returns List of mentor's slots
   */
  async getSlotsByMentor(mentorId: string): Promise<ISlot[]> {
    const slots = await SlotModel.find({ mentorId });
    return slots;
    // .populate("mentorId");
  }

  /**
   * Get a single slot by ID
   * @param slotId Slot's ObjectId
   * @returns Slot document or null
   */
  async getSlotById(slotId: ObjectId): Promise<ISlot | null> {
    return await SlotModel.findById(slotId).populate("mentorId");
  }

  /**
   * Book a slot
   * @param slotId Slot's ObjectId
   * @param learnerId Learner's ObjectId
   * @returns Updated Slot Document
   */
  async bookSlot(slotId: ObjectId): Promise<ISlot | null> {
    return await SlotModel.findByIdAndUpdate(
      slotId,
      { isBooked: true },
      { new: true }
    );
  }

  /**
   * Delete a slot
   * @param slotId Slot's ObjectId
   * @returns Deleted Slot Document or null
   */
  async deleteSlot(slotId: ObjectId): Promise<ISlot | null> {
    return await SlotModel.findByIdAndDelete(slotId);
  }
}

export default SlotRepository;
