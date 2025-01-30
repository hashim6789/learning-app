import React from "react";

interface ReadingMaterialFormProps {
  register: any;
}

const ReadingMaterialForm: React.FC<ReadingMaterialFormProps> = ({
  register,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Content:</label>
    <textarea
      {...register("content")}
      className="w-full p-2 border rounded"
      placeholder="Enter content for reading material"
    />
  </div>
);

export default ReadingMaterialForm;
