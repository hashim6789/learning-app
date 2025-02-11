import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import Material from "../../../application/entities/Material";
import IMaterialRepository from "../../../application/IRepositories/IMaterialRepository";
import MaterialModel, { IMaterial } from "../models/MaterialModel";
import { MaterialQuery } from "../../../shared/types/filters";

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
      const materials = await MaterialModel.find({ type }).sort({
        createdAt: -1,
      });
      return materials ? materials.map(mapMaterial) : null;
    } catch (error) {
      throw new Error("Failed to fetch materials by type");
    }
  }

  async fetchMentorMaterialByTitle(
    mentorId: string,
    title: string
  ): Promise<Material | null> {
    try {
      const material = await MaterialModel.findOne({
        mentorId,
        title: { $regex: new RegExp(title, "i") },
      });

      if (!material) return null;
      return mapMaterial(material);
    } catch (error) {
      throw new Error("Failed to fetch material by title of the mentor");
    }
  }

  async fetchMaterialsByMentorId(
    mentorId: string,
    { type = "all", search = "", page = "1", limit = "10" }: MaterialQuery
  ): Promise<Material[] | null> {
    try {
      const materials = await MaterialModel.find({
        mentorId,
        type: type !== "all" ? type : { $exists: true },
        title: { $regex: search, $options: "i" },
      })
        .skip((parseInt(page, 10) - 1) * parseInt(limit, 10))
        .limit(parseInt(limit, 10))
        .sort({ createdAt: -1 });

      if (!materials) return null;
      return materials.map((material) => mapMaterial(material));
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
        fileKey: data.fileKey,
        duration: data.duration,
        mentorId,
        type: data.type,
      });

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

  async fetchMaterialsByMentorIds(
    materialIds: string[]
  ): Promise<Material[] | null> {
    try {
      const materials = await MaterialModel.find({ _id: { $in: materialIds } });
      if (!materials) return null;
      return materials ? materials.map(mapMaterial) : null;
    } catch (error) {
      throw new Error("Failed to fetch the materials");
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
    data.fileKey,
    data.duration
  );
}

export default MaterialRepository;
