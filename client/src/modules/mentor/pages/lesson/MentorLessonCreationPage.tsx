import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, Clock, Book, Plus } from "lucide-react";
import { config } from "../../../../shared/configs/config";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";

interface LessonFormData {
  title: string;
  description: string;
  duration: number;
  materials: string[];
}

interface Material {
  id: string;
  title: string;
  type: "reading" | "assessment" | "video";
}

const MentorLessonCreation: React.FC = () => {
  const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<LessonFormData>({
    defaultValues: {
      materials: [],
      duration: 0,
    },
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await api.get(`${config.API_BASE_URL}/mentor/materials`);
      if (!response.data) throw new Error("Failed to fetch materials");
      const data = response.data.data;
      setAvailableMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const onSubmit = async (data: LessonFormData) => {
    try {
      setIsSubmitting(true);
      const response = await api.post(
        `${config.API_BASE_URL}/mentor/lessons`,

        data
      );

      if (!response.data) throw new Error("Failed to create lesson");
      showToast.success(response.data.message);

      reset();
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Lessons
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-50 border-b border-purple-100 p-6">
            <h1 className="text-2xl font-bold text-purple-900">
              Create New Lesson
            </h1>
            <p className="text-gray-600 mt-1">
              Add a new lesson to your course
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Title
                </label>
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter lesson title"
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
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                  })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter lesson description"
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
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter lesson duration"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Learning Materials
                </label>
                <Controller
                  name="materials"
                  control={control}
                  rules={{ required: "Select at least one material" }}
                  render={({ field }) => (
                    <div className="space-y-3">
                      {availableMaterials.map((material) => (
                        <label
                          key={material.id}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            field.value.includes(material.id)
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={material.id}
                            checked={field.value.includes(material.id)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...field.value, material.id]
                                : field.value.filter(
                                    (id) => id !== material.id
                                  );
                              field.onChange(newValue);
                            }}
                            className="h-4 w-4 text-purple-600 rounded border-gray-300"
                          />
                          <div className="ml-3 flex-1">
                            <p className="font-medium text-gray-900">
                              {material.title}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {material.type}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.materials && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.materials.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Lesson
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorLessonCreation;
