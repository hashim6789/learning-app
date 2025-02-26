import { ResponseModel } from "../../../shared/types/ResponseModel";
import { CreateCourseDTO } from "../../../shared/dtos/createCourseDTO";
import ICourseRepository from "../../IRepositories/ICourseRepository";
import { IMentorRepository } from "../../IRepositories/IMentorRepository";
import ValidateAccessTokenUseCase from "../mentor/access-token-validate.usecase"; // Import the access token validation use case
import { validateData } from "../../../shared/helpers/validateHelper";
interface Payload {
  role: "admin" | "mentor" | "learner";
  email: string;
}
class CourseCreationUseCase {
  private courseRepository: ICourseRepository;
  private mentorRepository: IMentorRepository;

  constructor(
    courseRepository: ICourseRepository,
    mentorRepository: IMentorRepository
  ) {
    this.courseRepository = courseRepository;
    this.mentorRepository = mentorRepository;
  }

  async execute(data: CreateCourseDTO): Promise<ResponseModel> {
    try {
      await validateData(data, CreateCourseDTO);

      const mentorCoursesData =
        await this.courseRepository.fetchAllCoursesByMentorId(data.mentorId, {
          search: data.title,
        });

      if (mentorCoursesData && mentorCoursesData.courses.length > 0) {
        return {
          statusCode: 404,
          success: false,
          message:
            "The same named course is already exist on this mentor created course list!",
        };
      }

      // Create course with uppercase title (if required)
      const createdCourse = await this.courseRepository.createCourse(data);

      if (!createdCourse) {
        return {
          statusCode: 400,
          success: false,
          message: "The course creation failed!",
        };
      }

      if (!createdCourse.id) {
        return {
          statusCode: 400,
          success: false,
          message: "The courseId of created course is null!",
        };
      }

      // const updatedMentor = await this.mentorRepository.setCreatedCourseId(
      //   createdCourse.mentorId,
      //   createdCourse.id
      // );

      return {
        statusCode: 201,
        success: true,
        message: "The course is created successfully.",
        data: createdCourse,
      };
    } catch (error) {
      throw new Error(
        "An error occurred while creating the course: " + (error as string)
      );
    }
  }
}

export default CourseCreationUseCase;
