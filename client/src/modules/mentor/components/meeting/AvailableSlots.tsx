import React from "react";
import { format } from "date-fns";

interface ISlot {
  _id: string;
  date: string;
  time: string;
  duration: number;
  isBooked: boolean;
}

interface Props {
  slots: ISlot[];
}

const AvailableSlots: React.FC<Props> = ({ slots }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Duration</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id} className="text-center">
              <td className="p-2 border">
                {format(new Date(slot.date), "yyyy-MM-dd")}
              </td>
              <td className="p-2 border">{slot.time}</td>
              <td className="p-2 border">{slot.duration} mins</td>
              <td
                className={`p-2 border ${
                  slot.isBooked ? "text-red-500" : "text-green-500"
                }`}
              >
                {slot.isBooked ? "Booked" : "Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableSlots;
