//imported dtos for check the body credentials
//imported the entities
//imported the repositories
//imported the use cases
//created the instances
//mentor controller
//mentor signup

import { Request, Response, NextFunction } from "express";
import MaterialRepository from "../../infrastructures/database/repositories/MaterialRepository";
import CreateMaterialUseCase from "../../application/use_cases/material/material-create.usecase";
import GetMaterialsOfMentorUseCase from "../../application/use_cases/material/materials-get-all-mentor.usecase";
import GetMateriaByIdUseCase from "../../application/use_cases/material/materials-get.usecase";
import Material from "../../application/entities/material.entity";
import UpdateMaterialByIdUseCase from "../../application/use_cases/material/materials-update.usecase";
import DeleteMaterialByIdUseCase from "../../application/use_cases/material/material-delete.usecase";

const materialRepository = new MaterialRepository();

const createMaterialUseCase = new CreateMaterialUseCase(materialRepository);
const getMaterialsOfMentorUseCase = new GetMaterialsOfMentorUseCase(
  materialRepository
);
const getMaterialByIdUseCase = new GetMateriaByIdUseCase(materialRepository);

const updateMaterialByIdUseCase = new UpdateMaterialByIdUseCase(
  materialRepository
);

const deleteMaterialByIdUseCase = new DeleteMaterialByIdUseCase(
  materialRepository
);

class MaterialController {
  async createMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const { data } = req.body;
      const response = await createMaterialUseCase.execute(data, mentorId);
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const { materialId } = req.params;
      const data = req.body;
      const response = await updateMaterialByIdUseCase.execute(
        mentorId,
        data,
        materialId
      );
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const { materialId } = req.params;
      const response = await deleteMaterialByIdUseCase.execute(materialId);
      if (response.success && response.data) {
        res
          .status(200)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async getMaterials(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        type = "all",
        search = "",
        page = "1",
        limit = "10",
      } = req.query as any;
      const mentorId = req.user?.userId || "";
      const response = await getMaterialsOfMentorUseCase.execute(mentorId, {
        type,
        search,
        page,
        limit,
      });
      if (response.success && response.data) {
        const { materials, docCount } = response.data as {
          materials: Material[];
          docCount: number;
        };
        res
          .status(200)
          .json({ message: response.message, data: materials, docCount });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  async getMaterialById(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const { materialId } = req.params;
      const response = await getMaterialByIdUseCase.execute(materialId);
      if (response.success && response.data) {
        const { material } = response.data as {
          material: Material;
        };
        res.status(200).json({ message: response.message, data: material });
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }
  //   async getAllMaterialsOfCourse(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const response = await getAllMaterialsOfCourse.execute({
  //         ...req.body,
  //         mentorId: req.user?.userId,
  //       });

  //       if (response.success && response.data) {
  //         res
  //           .status(200)
  //           .json({ message: response.message, data: response.data });
  //       } else {
  //         res.status(400).json({ message: response.message });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

export default MaterialController;
