import React from "react";

const MaterialActions: React.FC<{
  isEditing: boolean;
  handleEditClick: () => void;
}> = ({ isEditing, handleEditClick }) => {
  return !isEditing ? (
    <div className="p-6 flex justify-center">
      <button
        onClick={handleEditClick}
        className="px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg shadow-md 
                   hover:bg-purple-700 transition-all duration-300 ease-in-out
                   active:scale-95 focus:ring-2 focus:ring-purple-400"
      >
        Edit Material
      </button>
    </div>
  ) : null;
};

export default MaterialActions;
