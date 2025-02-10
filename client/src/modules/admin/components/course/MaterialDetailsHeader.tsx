import { Book, Video } from "lucide-react";
import { IMaterial } from "../../../../shared/types/Material";

const MaterialDetailsHeader: React.FC<{ material: IMaterial }> = ({
  material,
}) => (
  <div className="border-b border-gray-200 bg-red-50 p-6">
    <div className="flex items-center space-x-3 mb-4">
      {material.type === "reading" && <Book className="w-6 h-6 text-red-600" />}
      {material.type === "video" && <Video className="w-6 h-6 text-red-600" />}
      <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
        {material.type}
      </span>
    </div>
    <h1 className="text-2xl font-bold text-red-900 mb-2">{material.title}</h1>
    <p className="text-gray-600">{material.description}</p>
  </div>
);

export default MaterialDetailsHeader;
