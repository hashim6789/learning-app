import { CourseStatus } from "../../../shared/types";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import { User } from "../../../shared/types/User";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { INotificationService } from "../../interfaces/INotificationService";
import { Notification } from "../../entities/notification.entity";
import { getIo } from "../../../framework/socket/socketSetup";
import IGroupChatRepository from "../../IRepositories/IGroupChatRepository";

const adminId = "67970be7e5fa9da392abd8a8";

class UpdateCourseStatusUseCase {
  private courseRepository: ICourseRepository;
  private notificationService: INotificationService;
  private groupChatRepository: IGroupChatRepository;

  constructor(
    courseRepository: ICourseRepository,
    notificationService: INotificationService,
    groupChatRepository: IGroupChatRepository
  ) {
    this.courseRepository = courseRepository;
    this.notificationService = notificationService;
    this.groupChatRepository = groupChatRepository;
  }

  async execute(
    courseId: string,
    newStatus: CourseStatus,
    userId: string,
    userRole: User
  ): Promise<ResponseModel> {
    try {
      const course = await this.courseRepository.findCourseById(courseId);
      if (!course) {
        return {
          statusCode: 404,
          success: false,
          message: "The course doesn't exist!",
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
                  message: "Only requested courses can be rejected!",
                };
              }
              break;

            case "approved":
              if (course.status !== "requested") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "Only requested courses can be approved!",
                };
              }
              break;
            case "published":
              if (course.status !== "approved") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "Only approved courses can be published!",
                };
              }
              break;

            default:
              return {
                statusCode: 400,
                success: false,
                message: "You are trying to update to an invalid status!",
              };
          }
          break;
        case "mentor":
          if (userId !== course.mentorId) {
            return {
              statusCode: 400,
              success: false,
              message: "Yoy can't allow to update the status of this course!",
            };
          }
          switch (newStatus) {
            case "completed":
              if (course.status !== "draft" && course.status !== "rejected") {
                return {
                  statusCode: 400,
                  success: false,
                  message:
                    "Only drafted and rejected courses can be completed!",
                };
              }
              break;

            case "requested":
              if (course.status !== "completed") {
                return {
                  statusCode: 400,
                  success: false,
                  message: "Only completed courses can be requested!",
                };
              }
              break;

            default:
              return {
                statusCode: 400,
                success: false,
                message: "You are trying to update to an invalid status!",
              };
          }
          break;
        case "learner":
        default:
          return {
            statusCode: 400,
            success: false,
            message: "Learners cannot update the course!",
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
          message: "Failed to update the course status!",
        };
      }

      const notification = new Notification(
        "1",
        "Course Status Update",
        `The status of your course "${
          course.title
        }" has been updated to ${newStatus} by the ${
          userRole === "admin" ? "admin" : "mentor"
        }.`,
        userRole === "admin" ? course.mentorId : adminId,
        Date.now()
      );

      // Send notification to the mentor
      if (
        userRole === "admin" &&
        (newStatus === "approved" ||
          newStatus === "rejected" ||
          newStatus === "published")
      ) {
        await this.notificationService.sendNotification(notification);
        const io = getIo();
        if (io) {
          console.log("Emitting notification to mentor:", course.mentorId);
          io.to(course.mentorId).emit("receiveNotification", notification);
        }
      } else if (userRole === "mentor" && newStatus === "requested") {
        await this.notificationService.sendNotification(notification);
        const io = getIo();
        if (io) {
          console.log("Emitting notification to admin:", adminId);
          io.to(adminId).emit("receiveNotification", notification);
        }
      }

      if (userRole === "admin" && newStatus === "published") {
        const createdGroupChat = await this.groupChatRepository.createGroup(
          courseId,
          course.mentorId
        );
        if (!createdGroupChat) {
          return {
            statusCode: 400,
            success: false,
            message: "failed to create a group",
          };
        }
      }

      return {
        statusCode: 200,
        success: true,
        message: `The course status has been updated to ${newStatus} successfully.`,
        data: {
          course: updatedCourse,
        },
      };
    } catch (error) {
      throw new Error("An error occurred while updating the course status!");
    }
  }
}

export default UpdateCourseStatusUseCase;
