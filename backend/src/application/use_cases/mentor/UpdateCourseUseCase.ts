import { UpdateCourseDTO } from "../../../shared/dtos/updateCourse";
import { ResponseModel } from "../../../shared/types/ResponseModel";
import Course from "../../entities/Course";
import ICourseRepository from "../../IRepositories/ICourseRepository";

class UpdateCourseUseCase {
  private courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(
    courseId: string,
    data: UpdateCourseDTO
  ): Promise<ResponseModel> {
    try {
      const title = data.title;
      const existingCourse = await this.courseRepository.findCourseById(
        courseId
      );
      if (!existingCourse) {
        return {
          statusCode: 404,
          success: false,
          message: "The course is doesn't exist!",
        };
      }

      // const duplicateCourse = await this.courseRepository.findCourseByTitle(
      //   title
      // );

      // if (duplicateCourse && duplicateCourse !== existingCourse) {
      //   return {
      //     statusCode: 400,
      //     success: false,
      //     message: "The duplicate course is",
      //   };
      // }

      const updatedCourse = await this.courseRepository.updateCourseById(
        courseId,
        { ...data, title }
      );
      if (!updatedCourse) {
        return {
          statusCode: 400,
          success: false,
          message: "The course can't be update!",
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: "The course updated successfully.",
        data: {
          course: updatedCourse,
        },
      };
    } catch (error) {
      throw new Error("An error when update the course");
    }
  }
}

export default UpdateCourseUseCase;
