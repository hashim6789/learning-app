import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";

interface BlockData {
  change: boolean;
}
class BlockUnblockMentorUseCase {
  private mentorRepository: IMentorRepository;
  constructor(mentorRepository: IMentorRepository) {
    this.mentorRepository = mentorRepository;
  }

  async execute(mentorId: string, data: BlockData): Promise<ResponseModel> {
    const mentor = await this.mentorRepository.updateById(mentorId, {
      isBlocked: !data.change,
    });
    if (!mentor)
      return {
        statusCode: 404,
        success: false,
        message: "The mentor is doesn't exist!",
      };
    return {
      statusCode: 201,
      success: true,
      message: data.change
        ? "The mentor is blocked successfully."
        : "The mentor is unblocked successfully.",
      data: mentor,
    };
  }
}

export default BlockUnblockMentorUseCase;
