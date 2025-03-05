import { format } from "date-fns";
import { ISlot } from "../types/Slot";

export function transformSlots(slots: any[]): ISlot[] {
  return slots
    .map((slot) => {
      if (!slot.dateTime || isNaN(new Date(slot.dateTime).getTime())) {
        console.error("Invalid dateTime value:", slot.dateTime);
        return null;
      }

      const dateObj = new Date(slot.dateTime);

      return {
        _id: slot._id,
        mentorId: slot.mentorId,
        time: format(dateObj, "HH:mm"),
        date: format(dateObj, "yyyy-MM-dd"),
        duration: slot.duration,
        isBooked: slot.isBooked,
      };
    })
    .filter((slot): slot is ISlot => slot !== null);
}
