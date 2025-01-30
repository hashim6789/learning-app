import React from "react";
import { IVideoMaterial } from "../../../../shared/types/Material";

interface VideoMaterialFormProps {
  register: any;
}

const VideoMaterialForm: React.FC<VideoMaterialFormProps> = ({ register }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Video URL:</label>
    <input
      {...register("url")}
      type="text"
      className="w-full p-2 border rounded"
      placeholder="Enter video URL"
    />
  </div>
);

export default VideoMaterialForm;
