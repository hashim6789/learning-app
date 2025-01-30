import { Book, Clock, Edit, Hash, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { IMaterial, MaterialType } from "../../../../shared/types/Material";
import { useNavigate } from "react-router-dom";

interface MaterialCardProps {
  material: IMaterial;
  handleDelete: (materialId: string) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  handleDelete,
}) => {
  const materialId = material.id;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div
      // onClick={() => navigate(`/mentor/my-materials/${materialId}`)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getTypeIcon(material.type)}
            <h3 className="text-lg font-semibold text-purple-900">
              {material.title}
            </h3>
          </div>
          <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
            {material.type}
          </span>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-purple-50 rounded-full"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <button
                  onClick={() => navigate(`/mentor/my-materials/${materialId}`)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  view Material
                </button>
                <button
                  onClick={() => {
                    handleDelete(material.id);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Material
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4">{material.description}</p>

        <div className="border-t pt-4">
          {material.type === "reading" && (
            <div className="flex items-center text-gray-500">
              <Hash className="w-4 h-4 mr-2" />
              <span>{material.description.split(" ").length || 0} words</span>
            </div>
          )}

          {material.type === "video" && (
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span>{material.duration} minutes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;

const getTypeIcon = (type: MaterialType) => {
  switch (type) {
    case "reading":
      return <Book className="w-6 h-6 text-purple-600" />;
    case "video":
      return <video className="w-6 h-6 text-purple-600" />;
    default:
      return null;
  }
};
