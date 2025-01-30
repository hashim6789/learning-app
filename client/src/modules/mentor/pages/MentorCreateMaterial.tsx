import React from "react";
import { useForm } from "react-hook-form";
import { Book, Video } from "lucide-react";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";
import { showToast } from "../../../shared/utils/toastUtils";

type MaterialType = "reading" | "video";

interface FormData {
  title: string;
  description: string;
  type: MaterialType;
  duration: number;
  url: string;
}

const MentorCreateMaterial: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { type: "reading" },
  });

  const selectedType = watch("type");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post(
        `${config.API_BASE_URL}/mentor/materials`,
        { data }
      );
      if (response.data) {
        showToast.success("The material is created successfully.");
        reset();
      }
    } catch (error: any) {
      console.error(error);
      showToast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">
          Create New Material
        </h1>
        <p className="text-gray-600 mb-8">
          Add new learning contents for your students
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4 mb-6">
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
                          watch("type") === type
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  {...register("title", {
                    required: "Title is required",
                    validate: (value) =>
                      value.trim().length > 5 ||
                      "Title cannot be empty or just spaces",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter material title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Enter material description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 1,
                      message: "Duration must be at least 1 minute",
                    },
                    max: {
                      value: 50,
                      message: "Duration cannot exceed 50 minutes",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter duration"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {selectedType === "reading" ? "Content" : "Video"} URL
              </label>
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.url.message}
                </p>
              )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                {...register("url", { required: " URL is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter URL"
              />
            </div> */}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
            >
              Create Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorCreateMaterial;
