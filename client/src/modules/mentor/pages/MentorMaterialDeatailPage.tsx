import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Book,
  FileText,
  Video,
  Clock,
  Hash,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import {
  IReadingMaterial,
  IVideoMaterial,
  IAssessmentMaterial,
  IMaterial,
  isAssessmentMaterial,
  isVideoMaterial,
  isReadingMaterial,
} from "../../../shared/types/Material";
import { sampleMaterials } from "../../../shared/sample/sampleMaterials";
import api from "../../../shared/utils/api";
import { config } from "../../../shared/configs/config";

// Interfaces and type guards as provided

const MentorMaterialDetailPage: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const [material, setMaterial] = useState<IMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMaterialDetails();
  }, [materialId]);

  const fetchMaterialDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `${config.API_BASE_URL}/mentor/materials/${materialId}`
      );
      if (!response.data) throw new Error("Failed to fetch material details");
      const data = response.data.data;
      setMaterial(data);
      //   setMaterial(sampleMaterials[1]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load material details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold mb-2">Error loading material</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const ReadingContent: React.FC<{
    material: IMaterial & IReadingMaterial;
  }> = ({ material }) => (
    <div className="prose max-w-none">
      <div className="bg-purple-50 rounded-lg p-6 mb-6">
        <div className="flex items-center text-purple-700 mb-4">
          <Hash className="w-5 h-5 mr-2" />
          <span>{material.content.split(" ").length || "N/A"} words</span>
        </div>
        <div className="whitespace-pre-wrap">{material.content}</div>
      </div>
    </div>
  );

  const VideoContent: React.FC<{ material: IMaterial & IVideoMaterial }> = ({
    material,
  }) => (
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

  const AssessmentContent: React.FC<{
    material: IMaterial & IAssessmentMaterial;
  }> = ({ material }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-purple-50 rounded-lg p-4 mb-6">
        <div className="flex items-center text-purple-700">
          <FileText className="w-5 h-5 mr-2" />
          <span>{material.questions.length} Questions</span>
        </div>
        <div className="text-purple-700">
          <span>Total Marks: {material.totalMarks}</span>
        </div>
      </div>

      {material.questions.map((question, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-900">
              Question {index + 1}
            </h3>
          </div>
          <p className="text-gray-800 mb-4">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((option, optIndex) => (
              <div
                key={optIndex}
                className={`p-3 rounded-lg border ${
                  option === question.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  {option === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  )}
                  <span
                    className={
                      option === question.correctAnswer
                        ? "text-green-700"
                        : "text-gray-700"
                    }
                  >
                    {option}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Materials
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-purple-50 p-6">
            <div className="flex items-center space-x-3 mb-4">
              {material.type === "reading" && (
                <Book className="w-6 h-6 text-purple-600" />
              )}
              {material.type === "video" && (
                <Video className="w-6 h-6 text-purple-600" />
              )}
              {material.type === "assessment" && (
                <FileText className="w-6 h-6 text-purple-600" />
              )}
              <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                {material.type}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-purple-900 mb-2">
              {material.title}
            </h1>
            <p className="text-gray-600">{material.description}</p>
          </div>

          <div className="p-6">
            {isReadingMaterial(material) && (
              <ReadingContent material={material} />
            )}
            {isVideoMaterial(material) && <VideoContent material={material} />}
            {isAssessmentMaterial(material) && (
              <AssessmentContent material={material} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorMaterialDetailPage;
