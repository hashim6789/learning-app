import { IMaterial, MaterialType } from "../../../../shared/types/Material";
import { Book, Clock } from "lucide-react";

// Helper function to generate the signed URL for the S3 object (PDF or video)
const useSignedUrl = (fileKey: string, materialType: MaterialType): string => {
  const CLOUDFRONT_BASE_URL = "https://djcsj6q1rshpq.cloudfront.net"; // CloudFront URL for file access
  return `${CLOUDFRONT_BASE_URL}/uploads/${materialType}s/${fileKey}`;
};

// Component for downloading PDF content
const ReadingContent: React.FC<{ material: IMaterial }> = ({ material }) => {
  return (
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
  );
};

// Component for displaying video content
const VideoContent: React.FC<{ material: IMaterial }> = ({ material }) => {
  const signedUrl = useSignedUrl(material.fileKey, material.type);

  return (
    <div>
      <div className="bg-purple-50 rounded-lg p-6 mb-6">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          {signedUrl ? (
            <video controls className="w-full h-full rounded-lg">
              <source src={signedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="text-center text-gray-500">Loading video...</div>
          )}
        </div>
        <div className="flex items-center text-purple-700">
          <Clock className="w-5 h-5 mr-2" />
          <span>{material.duration} minutes</span>
        </div>
      </div>
    </div>
  );
};

// Main content component that conditionally renders PDF or video content
const MaterialDetailsContent: React.FC<{ material: IMaterial }> = ({
  material,
}) => {
  return material.type === "reading" ? (
    <ReadingContent material={material} />
  ) : (
    <VideoContent material={material} />
  );
};

export default MaterialDetailsContent;
