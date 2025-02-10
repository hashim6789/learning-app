import { Request, Response, NextFunction } from "express";

//imported the repositories
// import ProfileRepository from "../../infrastructures/database/repositories/ProfileRepository";

//imported the use cases
import UpdateProfileByIdUseCase from "../../application/use_cases/profile/UpdateProfile";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
// import GetCategoriesUseCase from "../../application/use_cases/admin/GetCategoriesUseCase";
// import CreateProfileUseCase from "../../application/use_cases/admin/CreateProfileUseCase";
// import ListUnListProfileUseCase from "../../application/use_cases/admin/ListUnlistProfileUseCase";
// import UpdateProfileUseCase from "../../application/use_cases/admin/UpdateProfileUseCase";

//created the instances
const mentorRepository = new MentorRepository();
// const getCategoriesUseCase = new GetCategoriesUseCase(profileRepository);
// const createProfileUseCase = new CreateProfileUseCase(profileRepository);
// const listUnListProfileUseCase = new ListUnListProfileUseCase(
//   profileRepository
// );
const updateProfileByIdUseCase = new UpdateProfileByIdUseCase(mentorRepository);

//mentor controller
class ProfileController {
  //fetch all categories
  //   async fetchAllCategoriesForAdmin(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const response = await getCategoriesUseCase.execute();
  //       if (response.success && response.data) {
  //         res
  //           .status(200)
  //           .json({ message: response.message, data: response.data });
  //       } else {
  //         res.status(400).json({ message: response.message });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //fetch all available categories(isListed : true)
  //   async fetchAllAvailableCategoriesForMentor(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const response = await getCategoriesUseCase.execute();
  //       if (response.success && response.data) {
  //         res
  //           .status(200)
  //           .json({ message: response.message, data: response.data });
  //       } else {
  //         res.status(400).json({ message: response.message });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //update profile
  async updateProfileOfMentor(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId || "";
      console.log(req.body);
      const { firstName, lastName } = req.body;
      const response = await updateProfileByIdUseCase.execute(
        {
          firstName,
          lastName,
        },
        userId
      );
      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: response.data });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //   //list and unlist the categories
  //   async listUnlistProfileForAdmin(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const { change } = req.body;
  //       const { profileId } = req.params;
  //       const response = await listUnListProfileUseCase.execute(profileId, {
  //         change,
  //       });
  //       if (response && response.data) {
  //         res
  //           .status(response.statusCode)
  //           .json({ message: response.message, data: response.data });
  //       } else {
  //         res.status(response.statusCode).json({ message: response.message });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   //update the profile
  //   async updateProfileForAdmin(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const { title } = req.body;
  //       const { profileId } = req.params;
  //       const response = await updateProfileUseCase.execute({
  //         profileId,
  //         title,
  //       });
  //       if (response && response.data) {
  //         res
  //           .status(response.statusCode)
  //           .json({ message: response.message, data: response.data });
  //       } else {
  //         res.status(response.statusCode).json({ message: response.message });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

export default ProfileController;
