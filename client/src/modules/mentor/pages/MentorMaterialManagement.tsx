import React, { useEffect, useState } from "react";
import { Book, FileText, Video, Clock, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";
import { sampleMaterials } from "../../../shared/sample/sampleMaterials";

// Define the base Material type
interface IMaterial {
  id: string;
  title: string;
  description: string;
  type: "reading" | "assessment" | "video";
}

// Type guard functions
const isReadingMaterial = (
  material: IMaterial
): material is IMaterial & IReadingMaterial => {
  return material.type === "reading";
};

const isAssessmentMaterial = (
  material: IMaterial
): material is IMaterial & IAssessmentMaterial => {
  return material.type === "assessment";
};

const isVideoMaterial = (
  material: IMaterial
): material is IMaterial & IVideoMaterial => {
  return material.type === "video";
};

interface IReadingMaterial {
  content: string;
}

interface IAssessmentMaterial {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  totalMarks: number;
}

interface IVideoMaterial {
  url: string;
  duration: number;
}

const MentorMaterialManagement: React.FC = () => {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await api(`${config.API_BASE_URL}/mentor/materials`);
      if (!response.data) throw new Error("Failed to fetch materials");
      const data = response.data.data.materials;
      console.log("materials", data);
      setMaterials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load materials");
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: IMaterial["type"]) => {
    switch (type) {
      case "reading":
        return <Book className="w-6 h-6 text-purple-600" />;
      case "assessment":
        return <FileText className="w-6 h-6 text-purple-600" />;
      case "video":
        return <Video className="w-6 h-6 text-purple-600" />;
    }
  };

  const MaterialCard: React.FC<{ material: IMaterial }> = ({ material }) => {
    const navigate = useNavigate();
    const materialId = material.id;
    return (
      <div
        onClick={() => navigate(`/mentor/my-materials/${materialId}`)}
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
          </div>

          <p className="text-gray-600 mb-4">{material.description}</p>

          <div className="border-t pt-4">
            {isReadingMaterial(material) && (
              <div className="flex items-center text-gray-500">
                <Hash className="w-4 h-4 mr-2" />
                <span>{material.content.split(" ").length || 0} words</span>
              </div>
            )}

            {isAssessmentMaterial(material) && (
              <div className="flex items-center text-gray-500">
                <FileText className="w-4 h-4 mr-2" />
                <span>{material.questions.length} questions</span>
                <span className="mx-2">•</span>
                <span>{material.totalMarks} marks</span>
              </div>
            )}

            {isVideoMaterial(material) && (
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error loading materials</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-purple-900 mb-2">
            Learning Materials
          </h1>
          <p className="text-gray-600">
            Manage your educational content and assessments
          </p>
          <button
            onClick={() => navigate("/mentor/my-materials/create")}
            className="bg-purple-600"
          >
            Create
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>

        {materials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No materials found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorMaterialManagement;
