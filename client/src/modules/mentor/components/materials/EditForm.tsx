import { useForm } from "react-hook-form";
import { IMaterial } from "../../../../shared/types/Material";
import { useState } from "react";
import { Book, Video } from "lucide-react";

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
    watch,
  } = useForm<IMaterial>({
    defaultValues: material || {},
  });

  const selectedType = watch("type");

  const [uploading, setUploading] = useState<boolean>(false);
  const fileKey = material ? material.fileKey : null;
  const [preview, setPreview] = useState<string | null>(fileKey); // Store the preview URL

  // Function to handle file upload (you can customize this)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4 mb-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["reading", "video"].map((type) => (
                <label
                  key={type}
                  className={`
                    flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                    ${
                      selectedType === type
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-200"
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("type")}
                    className="sr-only"
                    disabled={!!preview}
                    onChange={(e) => handleChange("type", e.target.value)}
                  />
                  {type === "reading" && (
                    <Book className="w-5 h-5 mr-2 text-purple-600" />
                  )}
                  {type === "video" && (
                    <Video className="w-5 h-5 mr-2 text-purple-600" />
                  )}
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
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
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                validate: (value) =>
                  value.trim().length > 10 ||
                  "Description cannot be empty or just spaces",
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
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              {...register("duration", {
                required: "Duration is required",
                min: {
                  value: 2,
                  message: "Duration must be at least 2 minutes",
                },
                max: {
                  value: 50,
                  message: "Duration cannot exceed 50 minutes",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter duration"
              onChange={(e) => handleChange("duration", e.target.value)}
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>

        {/* File upload field */}
        {!preview && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selectedType === "reading" ? "Upload PDF" : "Upload Video"}
            </label>
            <input
              type="file"
              accept={
                selectedType === "reading" ? "application/pdf" : "video/mp4"
              }
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {uploading && <p className="text-sm text-gray-600">Uploading...</p>}
          </div>
        )}

        {/* File preview */}
        {preview && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preview
            </label>
            {material && selectedType === "reading" && (
              <div className="prose max-w-none">
                <div className="bg-purple-50 rounded-lg p-6 mb-6 cursor-pointer hover:bg-purple-100 transition-colors duration-200">
                  <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                    Reading Material
                  </h2>
                  <div className="flex flex-col items-center justify-center">
                    <Book className="w-12 h-12 text-purple-600 mb-2" />
                    <p className="text-purple-600 mb-2">
                      {material.fileKey || "Reading Material"}
                    </p>
                    <div className="text-purple-600 font-medium">
                      {material.duration
                        ? `${material.duration} minutes`
                        : "Duration not available"}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {material && selectedType === "video" && (
              <div className="prose max-w-none">
                <div className="bg-purple-50 rounded-lg p-6 mb-6 cursor-pointer hover:bg-purple-100 transition-colors duration-200">
                  <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                    Video Material
                  </h2>
                  <div className="flex flex-col items-center justify-center">
                    <Video className="w-12 h-12 text-purple-600 mb-2" />
                    <p className="text-purple-600 mb-2">
                      {material.fileKey || "Reading Material"}
                    </p>
                    <div className="text-purple-600 font-medium">
                      {material.duration
                        ? `${material.duration} minutes`
                        : "Duration not available"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden Input for File Key */}
        <input
          type="hidden"
          {...register("fileKey")}
          onChange={(e) => handleChange("fileKey", e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={handleEditClick}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditForm;
