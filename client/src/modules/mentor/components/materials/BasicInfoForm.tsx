import React from "react";
import { useForm } from "react-hook-form";
import { IMaterial } from "../../../../shared/types/Material";

interface MaterialBaseFormProps {
  register: any;
}

const MaterialBaseForm: React.FC<MaterialBaseFormProps> = ({ register }) => (
  <div className="mb-4">
    <label className="block font-semibold">Title:</label>
    <input
      {...register("title", { required: true })}
      type="text"
      className="border p-2 rounded w-full"
    />

    <label className="block font-semibold mt-2">Description:</label>
    <textarea
      {...register("description")}
      className="border p-2 rounded w-full"
    />

    <label className="block font-semibold mt-2">Duration:</label>
    <input
      {...register("duration", { required: true })}
      type="number"
      className="border p-2 rounded w-full"
    />
  </div>
);

export default MaterialBaseForm;
