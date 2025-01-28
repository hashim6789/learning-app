import Material from "../entities/Material";
import { CreateMaterialDTO } from "../../shared/dtos/CreateMaterialDTO";

export default interface IMaterialRepository {
  fetchMaterialById(materialId: string): Promise<Material | null>;
  fetchAllMaterialsByType(type: string): Promise<Material[] | null>;
  fetchMaterialsByMentorId(mentorId: string): Promise<Material[] | null>;

  createMaterial(
    data: CreateMaterialDTO,
    mentorId: string
  ): Promise<Material | null>;
  updateMaterialById(
    materialId: string,
    data: Partial<Material>
  ): Promise<Material | null>;
  deleteMaterialById(materialId: string): Promise<Material | null>;
}
