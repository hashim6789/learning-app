import { CourseStatus } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { User } from "../../../shared/types/User";
import ICourseRepository from "../../IRepositories/ICourseRepository";

class UpdateCourseStatusUseCase {
  private courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(
    courseId: string,
    newStatus: CourseStatus,
    userRole: User
  ): Promise<ResponseModel> {
    try {
      const course = await this.courseRepository.findCourseById(courseId);
      if (!course) {
        return {
          statusCode: 404,
          success: false,
          message: "The course is doesn't exist!",
        };
      }

      switch (userRole) {
        case "admin":
          switch (newStatus) {
            case "rejected":
              if (course.status !== "requested") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "The drafted courses only update to completed!",
                };
              }
              break;

            case "approved":
              if (course.status !== "requested") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "The completed courses only update to requested!",
                };
              }
              break;
            case "published":
              if (course.status !== "approved") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "The completed courses only update to requested!",
                };
              }
              break;

            default:
              return {
                statusCode: 400,
                success: false,
                message: "You are trying to update invalid status!!!",
              };
          }
          break;
        case "mentor":
          switch (newStatus) {
            case "completed":
              if (course.status !== "draft") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "The drafted courses only update to completed!",
                };
              }
              break;

            case "requested":
              if (course.status !== "completed") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "The completed courses only update to requested!",
                };
              }
              break;

            default:
              return {
                statusCode: 400,
                success: false,
                message: "You are trying to update invalid status!!!",
              };
          }
          break;
        case "learner":
        default:
          return {
            statusCode: 400,
            success: false,
            message: "The learner can't update the course!!!!!",
          };
      }

      const updatedCourse = await this.courseRepository.updateCourseById(
        courseId,
        { status: newStatus }
      );
      if (!updatedCourse) {
        return {
          statusCode: 400,
          success: false,
          message: "The course status update is failed!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: `The course status is updated to ${newStatus} successfully.`,
        data: {
          course: updatedCourse,
        },
      };
    } catch (error) {
      throw new Error("An Error when updating the course status!");
    }
  }
}

export default UpdateCourseStatusUseCase;
