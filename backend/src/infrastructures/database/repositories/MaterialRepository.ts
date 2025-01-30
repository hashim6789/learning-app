import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import Material from "../../../application/entities/Material";
import IMaterialRepository from "../../../application/IRepositories/IMaterialRepository";
import MaterialModel, { IMaterial } from "../models/MaterialModel";

class MaterialRepository implements IMaterialRepository {
  async fetchMaterialById(materialId: string): Promise<Material | null> {
    try {
      const material = await MaterialModel.findById(materialId);
      return material ? mapMaterial(material) : null;
    } catch (error) {
      throw new Error("Failed to fetch the material");
    }
  }

  async fetchAllMaterialsByType(type: string): Promise<Material[] | null> {
    try {
      const materials = await MaterialModel.find({ type });
      return materials ? materials.map(mapMaterial) : null;
    } catch (error) {
      throw new Error("Failed to fetch materials by type");
    }
  }
  async fetchMaterialsByMentorId(mentorId: string): Promise<Material[] | null> {
    try {
      const materials = await MaterialModel.find({ mentorId });
      if (!materials) return null;
      return materials ? materials.map(mapMaterial) : null;
    } catch (error) {
      throw new Error("Failed to fetch materials by type");
    }
  }

  async createMaterial(
    data: CreateMaterialDTO,
    mentorId: string
  ): Promise<Material | null> {
    try {
      const newMaterial = await MaterialModel.create({
        title: data.title,
        description: data.description,
        url: data.url,
        duration: data.duration,
        mentorId,
        type: data.type,
      });
      console.log(data.type);

      return newMaterial ? mapMaterial(newMaterial) : null;
    } catch (error: any) {
      throw new Error(`Failed to create the material: ${error.message}`);
    }
  }

  async updateMaterialById(
    materialId: string,
    data: Partial<Material>
  ): Promise<Material | null> {
    try {
      const updatedMaterial = await MaterialModel.findByIdAndUpdate(
        materialId,
        data,
        { new: true }
      );
      return updatedMaterial ? mapMaterial(updatedMaterial) : null;
    } catch (error) {
      throw new Error("Failed to update the material");
    }
  }

  async deleteMaterialById(materialId: string): Promise<Material | null> {
    try {
      const deletedMaterial = await MaterialModel.findByIdAndDelete(materialId);
      return deletedMaterial ? mapMaterial(deletedMaterial) : null;
    } catch (error) {
      throw new Error("Failed to delete the material");
    }
  }
}

function mapMaterial(data: IMaterial): Material {
  const id = data._id.toString();

  return new Material(
    id,
    data.title,
    data.description,
    data.type,
    data.url,
    data.duration
  );
}

export default MaterialRepository;
