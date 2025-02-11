import Material from "../entities/Material";
import { CreateMaterialDTO } from "../../shared/dtos/CreateMaterialDTO";
import { MaterialQuery } from "../../shared/types/filters";

export default interface IMaterialRepository {
  fetchMaterialById(materialId: string): Promise<Material | null>;
  fetchAllMaterialsByType(type: string): Promise<Material[] | null>;
  fetchMaterialsByMentorId(
    mentorId: string,
    filter: MaterialQuery
  ): Promise<Material[] | null>;
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
  fetchMaterialsByMentorIds(materialIds: string[]): Promise<Material[] | null>;
}
