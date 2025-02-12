import { Request, Response, NextFunction } from "express";

//imported the use cases
import UpdateProfileByIdUseCase from "../../application/use_cases/profile/UpdateProfile";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import GetProfileForMentorUseCase from "../../application/use_cases/profile/GetProfileForMentor";
import { Mentor } from "../../application/entities/Mentor";
import UpdateProfileImageForMentorUseCase from "../../application/use_cases/profile/UpdateProfileImageForMentor";
import VerifyCurrentPasswordForMentorUseCase from "../../application/use_cases/profile/VerifyCurrentPasswordUseCase";
import ChangeMentorPasswordUseCase from "../../application/use_cases/profile/ChangePasswordForMentom";

//created the instances
const mentorRepository = new MentorRepository();

const updateProfileByIdUseCase = new UpdateProfileByIdUseCase(mentorRepository);
const getProfileForMentorUseCase = new GetProfileForMentorUseCase(
  mentorRepository
);
const updateProfileImageOfMentorUseCase =
  new UpdateProfileImageForMentorUseCase(mentorRepository);
const verifyCurrentPasswordForMentorUseCase =
  new VerifyCurrentPasswordForMentorUseCase(mentorRepository);

const changePasswordForMentorUseCase = new ChangeMentorPasswordUseCase(
  mentorRepository
);

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

  //update profile
  async updateProfileImageOfMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.userId || "";
      const { profilePicture } = req.body;
      const response = await updateProfileImageOfMentorUseCase.execute(
        {
          profilePicture,
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

  //get profile
  async fetchProfileDetailsOfMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mentorId = req.user?.userId || "";
      const response = await getProfileForMentorUseCase.execute(mentorId);
      const { mentor } = response.data as { mentor: Mentor[] };

      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: mentor });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //verify current password
  async verifyPasswordForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mentorId = req.user?.userId || "";
      const { currentPassword } = req.body;
      const response = await verifyCurrentPasswordForMentorUseCase.execute(
        { currentPassword },
        mentorId
      );
      const { isVerified } = response.data as { isVerified: boolean };

      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: isVerified });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //verify current password
  async changePasswordForMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const mentorId = req.user?.userId || "";
      const { newPassword, confirmPassword } = req.body;
      const response = await changePasswordForMentorUseCase.execute(
        { newPassword, confirmPassword },
        mentorId
      );
      res.status(response.statusCode).json({ message: response.message });
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
