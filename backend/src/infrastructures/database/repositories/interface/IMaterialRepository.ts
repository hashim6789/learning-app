import Material from "../../../../application/entities/material.entity";
import { CreateMaterialDTO } from "../../../../shared/dtos/CreateMaterialDTO";
import { MaterialQuery } from "../../../../shared/types/filters";

export default interface IMaterialRepository {
  fetchMaterialById(materialId: string): Promise<Material | null>;
  fetchAllMaterialsByType(
    type: string
  ): Promise<{ materials: Material[]; docCount: number } | null>;
  fetchMaterialsByMentorId(
    mentorId: string,
    filter: MaterialQuery
  ): Promise<{ materials: Material[]; docCount: number } | null>;
  fetchMentorMaterialByTitle(
    mentorId: string,
    title: string
  ): Promise<Material | null>;

  createMaterial(
    data: CreateMaterialDTO,
    mentorId: string
  ): Promise<Material | null>;
  updateMaterialById(
    materialId: string,
    data: Partial<Material>
  ): Promise<Material | null>;
  deleteMaterialById(materialId: string): Promise<Material | null>;
  fetchMaterialsByMentorIds(
    materialIds: string[]
  ): Promise<{ materials: Material[]; docCount: number } | null>;
}
