import { Request, Response, NextFunction } from "express";
import MaterialRepository from "../../infrastructures/database/repositories/MaterialRepository";
import CreateMaterialUseCase from "../../application/use_cases/material/CreateMaterialUseCase";
import GetMaterialsOfMentorUseCase from "../../application/use_cases/material/GetMaterialsOfMentorUseCase";
import GetMateriaByIdUseCase from "../../application/use_cases/material/GetMeterialByIdUseCase";
import Material from "../../application/entities/Material";
import UpdateMaterialByIdUseCase from "../../application/use_cases/material/UpdateMaterilaByIdUseCase";
import DeleteMaterialByIdUseCase from "../../application/use_cases/material/DeleteMaterialByIdUseCase";

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
  async createMaterialForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

  async updateMaterialForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mentorId = req.user?.userId || "";
      const { materialId } = req.params;
      const data = req.body;
      const response = await updateMaterialByIdUseCase.execute(
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
  async deleteMaterialForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
  async getMaterialsOfMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const mentorId = req.user?.userId || "";
      const response = await getMaterialsOfMentorUseCase.execute(mentorId);
      if (response.success && response.data) {
        const { materials } = response.data as {
          materials: Material[];
        };
        res.status(200).json({ message: response.message, data: materials });
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
