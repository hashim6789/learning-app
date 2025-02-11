import React from "react";

interface LoadingComponentProps {
  item: string;
  theme: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ item, theme }) => {
  return (
    <div className="container mx-auto p-6 max-w-7xl h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div
          className={`animate-spin h-12 w-12 mb-4 border-4 border-${theme}-600 border-t-transparent rounded-full mx-auto`}
        ></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading {item} details...
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we fetch the information
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
