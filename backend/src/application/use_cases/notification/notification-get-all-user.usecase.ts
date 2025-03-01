import { ResponseModel } from "../../../shared/types/ResponseModel";
import { INotificationRepository } from "../../../infrastructures/database/repositories/interface/INotificationRepository";

class GetAllNotificationOfUserUseCase {
  private notificationRepository: INotificationRepository;
  constructor(notificationRepository: INotificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async execute(userId: string): Promise<ResponseModel> {
    try {
      const notifications =
        await this.notificationRepository.findAllByRecipientId(userId);
      if (!notifications) {
        return {
          statusCode: 404,
          success: false,
          message: "The notification is doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The notification fetched successfully.`,
        data: notifications,
      };
    } catch (error) {
      throw new Error("An Error when fetch the notification status!");
    }
  }
}

export default GetAllNotificationOfUserUseCase;
