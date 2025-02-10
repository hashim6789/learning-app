// types.ts
import { Control, FieldErrors } from "react-hook-form";
import { Category } from "../../../../shared/types/Category";
import { Lesson } from "../../../../shared/types/Lesson";

export interface FormInputs {
  title: string;
  description: string;
  category: { title: string; id: string } | null;
  thumbnail: string | null;
  lessons: { id: string; title: string }[];
}

export interface ImageState {
  src: string;
  type?: string;
}

// components/ImageCropper.tsx
import React from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";

interface ImageCropperProps {
  image: ImageState;
  cropperRef: React.RefObject<CropperRef>;
  onCancel: () => void;
  onSave: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  cropperRef,
  onCancel,
  onSave,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-4">Crop Your Image</h2>
      <div className="aspect-video">
        <Cropper
          ref={cropperRef}
          src={image.src}
          className="cropper"
          stencilProps={{
            aspectRatio: 16 / 9,
          }}
        />
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-purple-500 text-purple-500 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Save Crop
        </button>
      </div>
    </div>
  </div>
);
