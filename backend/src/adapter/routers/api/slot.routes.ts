// src/adapters/routes/SlotRoutes.ts
import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
  checkUserBlocked,
  validate,
} from "../../middleware";
import { SlotController } from "../../controllers/slot.controller";

const slotRouter = Router();

const slotController = new SlotController();

slotRouter.post(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  slotController.addSlot
);

slotRouter.get(
  "/",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor"]),
  slotController.getSlots
);
slotRouter.get(
  "/mentors/:mentorId",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["mentor", "learner"]),
  slotController.getSlotsOfLearner
);
slotRouter.patch(
  "/:slotId/book",
  authenticateToken,
  checkUserBlocked,
  authorizeRole(["learner"]),
  slotController.bookSlot
);

export default slotRouter;
