import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import LearnerController from "../../controllers/LearnerController.ts";
import GetLearnersUseCase from "../../../application/use_cases/admin/GetLearnersUseCase";
import LearnerRepository from "../../../infrastructures/database/repositories/LearnerRepository";
import BlockUnblockLearnerUseCase from "../../../application/use_cases/admin/BlockUnblockLearnerUseCase";
import GetLearnerByIdUseCase from "../../../application/use_cases/admin/GetLearnerByIdUseCase";
const learnerRouter = express.Router();

const learnerRepository = new LearnerRepository();
const getLearnersUseCase = new GetLearnersUseCase(learnerRepository);
const blockUnblockLearner = new BlockUnblockLearnerUseCase(learnerRepository);
const getLearnerByIdUseCase = new GetLearnerByIdUseCase(learnerRepository);
const learnerController = new LearnerController(
  getLearnersUseCase,
  blockUnblockLearner,
  getLearnerByIdUseCase
);

learnerRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getAllLearnersForAdmin.bind(learnerController)
);

learnerRouter.get(
  "/:learnerId",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getLearnerForAdmin.bind(learnerController)
);

learnerRouter.patch(
  "/:learnerId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.blockUnblockLearner.bind(learnerController)
);

export default learnerRouter;
