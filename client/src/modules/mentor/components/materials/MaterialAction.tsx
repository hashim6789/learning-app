const MaterialActions: React.FC<{
  isEditing: boolean;
  handleEditClick: () => void;
}> = ({ isEditing, handleEditClick }) => {
  return !isEditing ? (
    <div className="p-6 flex justify-between">
      <button
        onClick={handleEditClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Edit Material
      </button>
    </div>
  ) : null;
};

export default MaterialActions;
