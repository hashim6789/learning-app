import { ResponseModel } from "../../../shared/types/ResponseModel";
import { IProgressRepository } from "../../IRepositories/IProgressRepository";

class GetProgressOfCourseUseCase {
  private progressRepository: IProgressRepository;
  constructor(progressRepository: IProgressRepository) {
    this.progressRepository = progressRepository;
  }

  async execute(userId: string, courseId: string): Promise<ResponseModel> {
    try {
      const courseProgressDetails =
        await this.progressRepository.fetchCourseProgressDetails(
          userId,
          courseId
        );
      if (!courseProgressDetails) {
        return {
          statusCode: 404,
          success: false,
          message: "The progress is doesn't exist!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The progress fetched successfully.`,
        data: courseProgressDetails,
      };
    } catch (error) {
      throw new Error("An Error when fetch the progress status!");
    }
  }
}

export default GetProgressOfCourseUseCase;
