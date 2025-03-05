import { zodResolver } from "@hookform/resolvers/zod";
import { SlotFormData, slotSchema } from "../../schemas/slotSchema";
import { useForm } from "react-hook-form";

const SlotForm = ({ onSubmit }: { onSubmit: (data: SlotFormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SlotFormData>({
    resolver: zodResolver(slotSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Date Field */}
      <div>
        <label className="block text-gray-600 mb-1">Select Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          {...register("date")}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Time Field */}
      <div>
        <label className="block text-gray-600 mb-1">Select Time:</label>
        <input
          type="time"
          className="w-full p-2 border rounded"
          {...register("time")}
        />
        {errors.time && (
          <p className="text-red-500 text-sm">{errors.time.message}</p>
        )}
      </div>

      {/* Duration Field */}
      <div>
        <label className="block text-gray-600 mb-1">Duration (minutes):</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          {...register("duration", { valueAsNumber: true })}
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Slot
      </button>
    </form>
  );
};

export default SlotForm;
