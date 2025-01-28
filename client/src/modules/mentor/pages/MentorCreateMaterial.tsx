import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Book, FileText, Video, Plus, X } from "lucide-react";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";

type MaterialType = "reading" | "assessment" | "video";

interface FormData {
  title: string;
  description: string;
  type: MaterialType;
  // Reading specific
  content?: string;
  wordCount?: number;
  // Assessment specific
  questions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  totalMarks?: number;
  // Video specific
  url?: string;
  duration?: number;
}

const MentorCreateMaterial: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: "reading",
      questions: [
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    },
  });

  const selectedType = watch("type");

  const onSubmit = async (data: FormData) => {
    try {
      // Replace with your API endpoint
      const response = await api.post(
        `${config.API_BASE_URL}/mentor/materials`,
        { data }
      );

      if (!response.data) throw new Error("Failed to create material");

      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">
          Create New Material
        </h1>
        <p className="text-gray-600 mb-8">
          Add new learning content for your students
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Basic Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["reading", "assessment", "video"].map((type) => (
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
                      {type === "assessment" && (
                        <FileText className="w-5 h-5 mr-2 text-purple-600" />
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
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter material description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Type Specific Fields */}
            {selectedType === "reading" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    {...register("content", {
                      required: "Content is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={10}
                    placeholder="Enter reading content"
                  />
                </div>
              </div>
            )}

            {selectedType === "video" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL
                  </label>
                  <input
                    {...register("url", { required: "Video URL is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter video URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    {...register("duration", {
                      required: "Duration is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter video duration"
                  />
                </div>
              </div>
            )}

            {selectedType === "assessment" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    {...register("totalMarks", {
                      required: "Total marks is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter total marks"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Questions
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const questions = watch("questions") || [];
                        const newQuestion = {
                          question: "",
                          options: ["", "", "", ""],
                          correctAnswer: "",
                        };
                        questions.push(newQuestion);
                      }}
                      className="flex items-center px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-md"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Question
                    </button>
                  </div>

                  <Controller
                    name="questions"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-6">
                        {field.value?.map((_, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-4"
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-medium text-gray-700">
                                Question {index + 1}
                              </h4>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const questions = field.value
                                      ? [...field.value]
                                      : [];
                                    questions.splice(index, 1);
                                    field.onChange(questions);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            <input
                              {...register(
                                `questions.${index}.question` as const
                              )}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter question"
                            />

                            <div className="space-y-2">
                              {[0, 1, 2, 3].map((optionIndex) => (
                                <input
                                  key={optionIndex}
                                  {...register(
                                    `questions.${index}.options.${optionIndex}` as const
                                  )}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                              ))}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Correct Answer
                              </label>
                              <select
                                {...register(
                                  `questions.${index}.correctAnswer` as const
                                )}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              >
                                <option value="">Select correct answer</option>
                                {field &&
                                  field.value &&
                                  field.value[index].options.map(
                                    (option, optIndex) => (
                                      <option key={optIndex} value={option}>
                                        {option || `Option ${optIndex + 1}`}
                                      </option>
                                    )
                                  )}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => {
                // Handle cancel
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
