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

export default slotRouter;
