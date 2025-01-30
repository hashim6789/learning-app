interface MaterialTypeSelectorProps {
  register: any;
}

export default function MaterialTypeSelector({
  register,
}: MaterialTypeSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        Select Material Type:
      </label>
      <select
        {...register("materialType")}
        className="w-full p-2 border rounded"
      >
        <option value="reading">Reading</option>
        <option value="video">Video</option>
        <option value="assessment">Assessment</option>
      </select>
    </div>
  );
}
