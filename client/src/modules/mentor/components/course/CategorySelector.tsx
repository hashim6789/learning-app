import { ChevronDown } from "lucide-react";
import { Category } from "../../../../shared/types/Category";
import { useState } from "react";

// components/CategorySelector.tsx
interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: { title: string; id: string } | null;
  onSelect: (category: Category) => void;
  error?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelect,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-purple-700">
        Category
      </label>
      <div className="relative">
        <div
          className="w-full px-4 py-2 border border-purple-200 rounded-md flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={selectedCategory?.id ? "text-black" : "text-purple-400"}
          >
            {selectedCategory?.id
              ? categories.find((cat) => cat.id === selectedCategory.id)?.title
              : "Select Course Category"}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            } text-purple-500`}
          />
        </div>
        {isOpen && (
          <CategoryDropdown
            categories={categories}
            onSelect={(category) => {
              onSelect(category);
              setIsOpen(false);
            }}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
