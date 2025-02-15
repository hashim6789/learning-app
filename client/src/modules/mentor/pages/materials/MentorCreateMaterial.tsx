import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Book, Video } from "lucide-react";
import api from "../../../../shared/utils/api";
import { showToast } from "../../../../shared/utils/toastUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type MaterialType = "reading" | "video";

interface FormData {
  title: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
}

const MentorCreateMaterial: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { type: "reading" },
  });

  const [uploading, setUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null); // Store the preview URL
  const selectedType = watch("type");

  const navigate = useNavigate();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (
      (selectedType === "reading" && file.type !== "application/pdf") ||
      (selectedType === "video" && file.type !== "video/mp4")
    ) {
      alert("Invalid file type!");
      return;
    }

    setUploading(true);
    try {
      // Request signed URL from backend
      const response = await api.post(`/api/upload/signed-url`, {
        fileName: file.name,
        fileType: file.type,
        materialType: selectedType,
      });

      const { signedUrl, fileKey } = response.data.data;

      // Upload file to S3
      const uploadResponse = await axios.put(signedUrl, file);
      showToast.success(`The ${selectedType} uploaded successfully...`);

      console.log("response =", uploadResponse);

      // Store file key in form
      setValue("fileKey", fileKey);

      // Set preview URL (if it's a video or reading)
      if (selectedType === "reading") {
        setPreview(URL.createObjectURL(file)); // For reading, we can create a preview URL for the PDF
      } else if (selectedType === "video") {
        setPreview(URL.createObjectURL(file)); // For video, we can also create a preview URL
      }
    } catch (error) {
      console.error("File upload failed", error);
    }
    setUploading(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post(`/api/materials`, {
        data,
      });
      if (response.data) {
        showToast.success("The material is created successfully.");
        reset();
        setPreview(null); // Reset preview after successful submission
        navigate("/mentor/my-materials");
      }
    } catch (error: any) {
      console.error(error);
      showToast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Materials
      </button>
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
                        disabled={!!preview}
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
                    maxLength: {
                      value: 300,
                      message: "Description must be at most 300 characters",
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
                {uploading && (
                  <p className="text-sm text-gray-600">Uploading...</p>
                )}
              </div>
            )}

            {/* File preview */}
            {preview && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview
                </label>
                {selectedType === "reading" && (
                  <embed
                    src={preview}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                )}
                {selectedType === "video" && (
                  <video controls width="100%" height="500px">
                    <source src={preview} type="video/mp4" />
                  </video>
                )}
              </div>
            )}

            {/* Hidden Input for File Key */}
            <input type="hidden" {...register("fileKey")} />
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
