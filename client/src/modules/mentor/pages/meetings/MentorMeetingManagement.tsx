import React, { useState, useEffect } from "react";
import SlotForm from "../../components/meeting/slotForm";
import { SlotFormData } from "../../schemas/slotSchema";
import { getUserProperty } from "../../../../shared/utils/user.util";
import api from "../../../../shared/utils/api";
import { ISlot } from "../../../../shared/types/Slot";
import { transformSlots } from "../../../../shared/utils/transformer.util";
import ScheduledMeetingsTable from "../../components/meeting/MeetingTable";
import AvailableSlots from "../../components/meeting/AvailableSlots";

const SlotManager: React.FC = () => {
  const [slots, setSlots] = useState<ISlot[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  // Fetch slots from API
  const fetchSlots = async () => {
    try {
      const response = await api.get("/api/slots");
      console.log(response.data.data, "response");

      // setSlots(sampleSlots);
      setSlots(transformSlots(response.data.data));
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  // Handle new slot submission
  const handleAddSlot = async (data: SlotFormData) => {
    try {
      const newSlot = {
        mentorId: getUserProperty("id"),
        date: data.date,
        time: data.time,
        duration: data.duration,
      };

      await api.post("/api/slots", newSlot);
      fetchSlots();
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Availability</h2>

      {/* Scheduled Meetings Table */}
      <ScheduledMeetingsTable />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Available Slots List */}
        <AvailableSlots slots={slots} />

        {/* Form to add available slots */}
        <SlotForm onSubmit={handleAddSlot} />
      </div>
    </div>
  );
};

export default SlotManager;
