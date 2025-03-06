import { ISlot } from "../interfaces/ISlot";
import { ObjectId } from "mongoose";
import SlotModel from "../models/slots.model";
import { ISlotRepository } from "./interface/ISlotRepository";
import { CreateSlotDTO } from "../../../shared/dtos/CreateSlotDTO";
import { Slot } from "../../../application/entities/slot.entiry";
import { Document } from "mongoose";

class SlotRepository implements ISlotRepository {
  /**
   * Create a new slot
   * @param slotData ISlot
   * @returns Created Slot Document
   */
  async createSlot(slotData: CreateSlotDTO): Promise<Slot> {
    console.log("Received Slot Data:", slotData); // Debugging output
    const dateTime = new Date(`${slotData.date}T${slotData.time}:00Z`);

    const slot = new SlotModel({
      mentorId: slotData.mentorId,
      duration: slotData.duration,
      dateTime,
    });
    const createdSlot = await SlotModel.create(slot);
    return this.mapToSlot(createdSlot);
  }

  /**
   * Get all available slots (not booked)
   * @returns List of available slots
   */
  async getAvailableSlots(): Promise<Slot[]> {
    const slots = await SlotModel.find({ isBooked: false });
    return slots.map(this.mapToSlot);
  }

  /**
   * Get slots by Mentor ID
   * @param mentorId Mentor's ObjectId
   * @returns List of mentor's slots
   */
  async getSlotsByMentor(mentorId: string): Promise<Slot[]> {
    const slots = await SlotModel.find({ mentorId });
    return slots.map(this.mapToSlot);
  }

  /**
   * Get slots by Course ID
   * @param courseId Course's ObjectId
   * @returns List of course's slots
   */
  async getSlotsByCourse(courseId: string): Promise<Slot[]> {
    const slots = await SlotModel.find({ courseId });
    return slots.map(this.mapToSlot);
  }

  /**
   * Get a single slot by ID
   * @param slotId Slot's ObjectId
   * @returns Slot document or null
   */
  async getSlotById(slotId: string): Promise<Slot | null> {
    const slot = await SlotModel.findById(slotId);
    return slot ? this.mapToSlot(slot) : null;
  }

  /**
   * Book a slot
   * @param slotId Slot's ObjectId
   * @param learnerId Learner's ObjectId
   * @returns Updated Slot Document
   */
  async bookSlot(slotId: string): Promise<Slot | null> {
    const slot = await SlotModel.findByIdAndUpdate(
      slotId,
      { isBooked: true },
      { new: true }
    );
    return slot ? this.mapToSlot(slot) : null;
  }

  /**
   * Delete a slot
   * @param slotId Slot's ObjectId
   * @returns Deleted Slot Document or null
   */
  async deleteSlot(slotId: string): Promise<Slot | null> {
    const slot = await SlotModel.findByIdAndDelete(slotId);
    return slot ? this.mapToSlot(slot) : null;
  }

  mapToSlot = (doc: Document): Slot => {
    return new Slot(
      doc.get("_id").toString(),
      doc.get("mentorId").toString(),
      doc.get("duration"),
      doc.get("dateTime"),
      doc.get("isBooked")
    );
  };
}

export default SlotRepository;
