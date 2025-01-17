import express from "express";
import authenticateToken from "../../middleware/authenticateMiddlewares";
import authorizeRole from "../../middleware/authorizationMiddlewares";
import LearnerController from "../../controllers/LearnerController.ts";
import GetLearnersUseCase from "../../../application/use_cases/admin/GetLearnersUseCase";
import LearnerRepository from "../../../infrastructures/database/repositories/LearnerRepository";
import BlockUnblockLearnerUseCase from "../../../application/use_cases/admin/BlockUnblockLearnerUseCase";
const learnerRouter = express.Router();

const learnerRepository = new LearnerRepository();
const getLearnersUseCase = new GetLearnersUseCase(learnerRepository);
const blockUnblockLearner = new BlockUnblockLearnerUseCase(learnerRepository);
const learnerController = new LearnerController(
  getLearnersUseCase,
  blockUnblockLearner
);

learnerRouter.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.getAllLearnersForAdmin.bind(learnerController)
);

learnerRouter.patch(
  "/:learnerId/block-unblock",
  authenticateToken,
  authorizeRole(["admin"]),
  learnerController.blockUnblockLearner.bind(learnerController)
);

export default learnerRouter;
