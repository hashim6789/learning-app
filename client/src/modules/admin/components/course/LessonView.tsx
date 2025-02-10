import React, { useState, useCallback } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import useFetch from "../../../../hooks/useFetch";
import { IMaterial } from "../../../../shared/types/Material";
import { useNavigate } from "react-router-dom";
import { getMaterialsIcon } from "../../../../shared/utils/icons";

interface LessonViewProps {
  lessonId: string;
  title: string;
}

const LessonView: React.FC<LessonViewProps> = ({ lessonId, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchUrl, setFetchUrl] = useState<string | null>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!fetchUrl) {
      setFetchUrl(`/api/lessons/${lessonId}/materials`);
    }
  }, [fetchUrl, lessonId]);

  return (
    <div className="w-full max-w-2xl border rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center p-4 bg-red-50 hover:bg-red-100 transition-all"
      >
        <span className="h-8 w-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full mr-4">
          {isOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </span>
        <h3 className="flex-1 text-left font-medium text-red-900">{title}</h3>
      </button>
      {isOpen && fetchUrl && <MaterialList lessonId={lessonId} />}
    </div>
  );
};

const MaterialList: React.FC<{
  lessonId: string;
}> = ({ lessonId }) => {
  const navigate = useNavigate();
  const {
    data: materials,
    loading,
    error,
  } = useFetch<IMaterial[]>(`/api/lessons/${lessonId}/materials`);
  if (loading) return <p className="p-4 text-red-600">Loading materials...</p>;
  if (error)
    return <p className="p-4 text-red-500">Failed to load materials.</p>;
  if (!materials?.length)
    return <p className="p-4 text-red-600">No materials available.</p>;

  return (
    <div className="border-t">
      {materials.map((material) => (
        <div
          onClick={() => navigate(`/admin/materials/${material.id}`)}
          key={material.id}
          className="flex items-center p-4 hover:bg-red-50 transition-colors border-b last:border-b-0"
        >
          <span className="h-8 w-8 flex items-center justify-center text-red-700 mr-4">
            {getMaterialsIcon(material.type)}
          </span>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-900">
              {material.title}
            </h4>
            <div className="flex items-center mt-1 text-xs text-red-600">
              <span className="capitalize">{material.type}</span>
              <span className="text-red-400 mx-2">•</span>
              <span>{material.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonView;
