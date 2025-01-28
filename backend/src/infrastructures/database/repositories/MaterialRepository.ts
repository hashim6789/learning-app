import { CreateMaterialDTO } from "../../../shared/dtos/CreateMaterialDTO";
import Material from "../../../application/entities/Material";
import IMaterialRepository from "../../../application/IRepositories/IMaterialRepository";
import {
  MaterialModel,
  IMaterial,
  IReadingMaterial,
  IAssessmentMaterial,
  IVideoMaterial,
} from "../models/MaterialModel";

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
      let createdMaterial;

      console.log(data.type);

      switch (data.type) {
        case "reading":
          // Ensure the required fields for reading material are present
          createdMaterial = await MaterialModel.create({
            title: data.title,
            description: data.description,
            mentorId,
            type: data.type,
            content: data.content,
            wordCount: data.wordCount,
          });
          break;

        case "assessment":
          // Ensure the required fields for assessment material are present
          createdMaterial = await MaterialModel.create({
            title: data.title,
            description: data.description,
            mentorId,
            type: data.type,
            questions: data.questions,
            totalMarks: data.totalMarks,
          });
          break;

        case "video":
          // Ensure the required fields for video material are present
          createdMaterial = await MaterialModel.create({
            title: data.title,
            description: data.description,
            mentorId,
            type: data.type,
            url: data.url,
            duration: data.duration,
          });
          break;

        default:
          throw new Error("Invalid material type");
      }

      return createdMaterial ? mapMaterial(createdMaterial) : null;
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

  switch (data.type) {
    case "reading":
      const readingData = data as IReadingMaterial;
      return new Material(
        id,
        data.title,
        data.description,
        data.type,
        readingData.content,
        null,
        null
      );

    case "assessment":
      const assessmentData = data as IAssessmentMaterial;
      return new Material(
        id,
        data.title,
        data.description,
        data.type,
        null,
        assessmentData.questions,
        null
      );

    case "video":
      const videoData = data as IVideoMaterial;
      return new Material(
        id,
        data.title,
        data.description,
        data.type,
        null,
        null,
        videoData.url
      );

    default:
      throw new Error("Unknown material type");
  }
}

export default MaterialRepository;
