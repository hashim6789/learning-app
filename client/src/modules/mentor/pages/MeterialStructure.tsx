// MaterialsStructure.tsx
import React from "react";
// import { Input } from '@/components/ui/input';

interface MaterialsStructureProps {
  numberOfMaterials: number;
}

const MaterialsStructure: React.FC<MaterialsStructureProps> = ({
  numberOfMaterials,
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Set Items of Materials</h4>
      {Array.from({ length: numberOfMaterials }, (_, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="font-medium w-24">Material {index + 1}</div>
          <input placeholder="material name" />
        </div>
      ))}
    </div>
  );
};

export default MaterialsStructure;
