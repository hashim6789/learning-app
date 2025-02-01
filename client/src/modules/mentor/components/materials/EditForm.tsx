import { useForm } from "react-hook-form";
import { IMaterial } from "../../../../shared/types/Material";

const EditForm: React.FC<{
  material: IMaterial | null;
  onSubmit: (data: IMaterial) => void;
  handleChange: (field: keyof IMaterial, value: any) => void;
  handleEditClick: () => void;
}> = ({ material, onSubmit, handleChange, handleEditClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMaterial>({
    defaultValues: material || {},
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
        Edit Material
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register("title", {
            required: "Title is required",
            validate: {
              isValid: (value) =>
                /^[a-zA-Z0-9\s]+$/.test(value) ||
                "Title must be alphanumeric only",
              isNotEmpty: (value) =>
                value.trim().length > 5 ||
                "Title cannot be empty or just spaces",
            },
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
            maxLength: {
              value: 50,
              message: "Title must be at most 50 characters",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enter material title"
          onChange={(e) => handleChange("title", e.target.value)}
        />
        {/* <input
          {...register("title", {
            required: "Title is required",
            validate: (value) =>
              value.trim().length > 0 || "Title cannot be empty",
          })}
          onChange={(e) => handleChange("title", e.target.value)}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
        /> */}
        {errors.title && (
          <div className="text-red-500 text-xs mt-1">
            {errors.title.message}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
            validate: (value) =>
              value.trim().length > 10 ||
              "Title cannot be empty or just spaces",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 300,
              message: "Description must be at most 300 characters",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          rows={3}
          placeholder="Enter material description"
        />
        {/* <textarea
          {...register("description", {
            required: "Description is required",
            validate: (value) =>
              value.trim().length > 0 || "Description cannot be empty",
          })}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          onChange={(e) => handleChange("description", e.target.value)}
        /> */}
        {errors.description && (
          <div className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </div>
        )}
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          {...register("type", { required: "Type selection is required" })}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
        <label className="block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          {...register("duration", {
            required: "Duration is required",
            min: {
              value: 2,
              message: "Duration must be at least 2 minute",
            },
            max: {
              value: 50,
              message: "Duration cannot exceed 50 minutes",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enter duration"
        />
        {/* <input
          type="number"
          {...register("duration", {
            required: "Duration is required",
            min: { value: 5, message: "Minimum duration is 5 minutes" },
          })}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          onChange={(e) => handleChange("duration", e.target.value)}
        /> */}
        {errors.duration && (
          <div className="text-red-500 text-xs mt-1">
            {errors.duration.message}
          </div>
        )}
      </div>

      {/* URL */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: /^(https?:\/\/)?(www\.)?[\w-]+(\.[a-z]+)+(\/\S*)?$/,
              message: "Enter a valid URL",
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enter URL"
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
          className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow-md 
                     hover:bg-gray-600 transition-all duration-300 ease-in-out active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md 
                     hover:bg-purple-700 transition-all duration-300 ease-in-out active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditForm;
