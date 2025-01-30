import { Clock } from "lucide-react";
import { IMaterial } from "../../../../shared/types/Material";

const ReadingContent: React.FC<{ material: IMaterial }> = ({ material }) => (
  <div className="prose max-w-none">
    <div className="bg-purple-50 rounded-lg p-6 mb-6">
      <div className="whitespace-pre-wrap">{material.url}</div>
    </div>
  </div>
);

const VideoContent: React.FC<{ material: IMaterial }> = ({ material }) => (
  <div>
    <div className="bg-purple-50 rounded-lg p-6 mb-6">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          src={material.url}
          className="w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
      <div className="flex items-center text-purple-700">
        <Clock className="w-5 h-5 mr-2" />
        <span>{material.duration} minutes</span>
      </div>
    </div>
  </div>
);

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
