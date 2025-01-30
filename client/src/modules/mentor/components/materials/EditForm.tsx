import { useForm } from "react-hook-form";
import { IMaterial } from "../../../../shared/types/Material";

const EditForm: React.FC<{
  material: IMaterial | null;
  onSubmit: (data: IMaterial) => void;
  handleChange: (field: keyof IMaterial, value: any) => void;
  handleEditClick: () => void;
  // errors: any;
}> = ({ material, onSubmit, handleChange, handleEditClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMaterial>({
    defaultValues: material || {},
  });

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-700">
          Title
        </label>
        <input
          {...register("title", {
            required: "Title is required",
            validate: (value) =>
              value.trim().length > 0 || "Title cannot be empty or just spaces",
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-invalid={errors.title ? "true" : "false"}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        {errors.title && (
          <div className="text-red-500 text-xs mt-1">
            {errors.title.message}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-700">
          Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
            validate: (value) =>
              value.trim().length > 0 ||
              "Description cannot be empty or just spaces",
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-invalid={errors.description ? "true" : "false"}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {errors.description && (
          <div className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </div>
        )}
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-700">
          Type
        </label>
        <select
          {...register("type", { required: "Type selection is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-invalid={errors.type ? "true" : "false"}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">Select a type</option>
          <option value="reading">Reading</option>
          <option value="video">Video</option>
        </select>
        {errors.type && (
          <div className="text-red-500 text-xs mt-1">{errors.type.message}</div>
        )}
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          {...register("duration", {
            required: "Duration is required",
            min: { value: 5, message: "Minimum duration is 5 minutes" },
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-invalid={errors.duration ? "true" : "false"}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
        {errors.duration && (
          <div className="text-red-500 text-xs mt-1">
            {errors.duration.message}
          </div>
        )}
      </div>

      {/* URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-purple-700">URL</label>
        <input
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\S*)?$/,
              message: "Enter a valid URL",
            },
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-invalid={errors.url ? "true" : "false"}
          onChange={(e) => handleChange("url", e.target.value)}
        />
        {errors.url && (
          <div className="text-red-500 text-xs mt-1">{errors.url.message}</div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleEditClick}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditForm;
