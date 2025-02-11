import React from "react";

interface ErrorComponentProps {
  item: string;
  theme: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ item, theme }) => {
  return (
    <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className={`text-xl font-bold text-${theme}-800`}>
          Error fetching {item} details...
        </h2>
        <p className="text-red-500 mt-2">Please try again (:</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
