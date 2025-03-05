// src/adapters/controllers/ChatController.ts
import { Request, Response, NextFunction } from "express";
import GroupChatRepository from "../../infrastructures/database/repositories/GroupChatRepository";
import GetAllGroupsOfLearnerUseCase from "../../application/use_cases/chat/mentor-groups-get-all.usecase";
import CreateMessageOfSenderUseCase from "../../application/use_cases/chat/group-message-post.usecase";
import ChatMessageRepository from "../../infrastructures/database/repositories/ChatMessageRepository";
import GetAllMessagesOfGroupUseCase from "../../application/use_cases/chat/group-message-get-all.usecase";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";

const groupChatRepository = new GroupChatRepository();
const chatMessageRepository = new ChatMessageRepository();
const learnerRepository = new LearnerRepository();
const mentorRepository = new MentorRepository();

const getAllGroupsOfLearnerUseCase = new GetAllGroupsOfLearnerUseCase(
  groupChatRepository
);

const getAllMessagesOfGroupUseCase = new GetAllMessagesOfGroupUseCase(
  chatMessageRepository
);

const createMessageOfSenderUseCase = new CreateMessageOfSenderUseCase(
  chatMessageRepository,
  learnerRepository,
  mentorRepository
);

class ChatController {
  constructor() {}

  async getGroupsDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const role = req.user?.role || "learner";
      // const userId = "679714e0a41657d40318789d";
      const response = await getAllGroupsOfLearnerUseCase.execute(userId, role);
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
  async postMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const role = req.user?.role || "learner";
      const { groupId } = req.params;
      const response = await createMessageOfSenderUseCase.execute(
        role,
        userId,
        groupId,
        req.body
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
  async getMessages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId || "";
      const { groupId } = req.params;
      const response = await getAllMessagesOfGroupUseCase.execute(groupId);
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
}

export default ChatController;
