import React, { useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { showToast } from "../../../../shared/utils/toastUtils";
import api from "../../../../shared/utils/api";
import { config } from "../../../../shared/configs/config";
import { UseFormSetValue } from "react-hook-form";
import { FormInputs } from "./CourseForm";

interface ThumbnailUploaderProps {
  setValue: UseFormSetValue<FormInputs>; // Correct typing
}

const UploadThumbnail: React.FC<ThumbnailUploaderProps> = ({ setValue }) => {
  const [image, setImage] = useState<{ src: string; type?: string } | null>(
    null
  );
  const [isCropping, setIsCropping] = useState(false);
  const cropperRef = useRef<CropperRef>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const blob = URL.createObjectURL(file);
    setImage({ src: blob, type: file.type });
    setIsCropping(true);
    e.target.value = "";
  };

  const handleCropComplete = async () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "cropped-image.png");

          try {
            const response = await api.post(
              `${config.API_BASE_URL}/mentor/upload/course-img`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            showToast.success("Image uploaded successfully!");
            setValue("thumbnail", response.data.url);
            setIsCropping(false);

            if (image?.src) URL.revokeObjectURL(image.src);
          } catch (error) {
            showToast.error("Image upload failed!");
          }
        }, "image/png");
      }
    }
  };

  if (isCropping && image) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
          <h2 className="text-xl font-bold mb-4">Crop Your Image</h2>
          <Cropper
            ref={cropperRef}
            src={image.src}
            stencilProps={{ aspectRatio: 16 / 9 }}
          />
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setIsCropping(false)}
              className="px-4 py-2 border border-purple-500 text-purple-500 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCropComplete}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Save Crop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-purple-700">
        Thumbnail
      </label>
      <input
        type="file"
        ref={inputRef}
        onChange={handleThumbnailUpload}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Upload Thumbnail
      </button>
    </div>
  );
};

export default UploadThumbnail;
