import { Request, Response, NextFunction } from "express";

//imported the use cases
import UpdateProfileByIdUseCase from "../../application/use_cases/profile/UpdateProfile";
import MentorRepository from "../../infrastructures/database/repositories/MentorRepository";
import GetProfileForMentorUseCase from "../../application/use_cases/profile/GetProfileForMentor";
import { Mentor } from "../../application/entities/mentor.entity";
import UpdateProfileImageForMentorUseCase from "../../application/use_cases/profile/UpdateProfileImageForMentor";
import VerifyCurrentPasswordForMentorUseCase from "../../application/use_cases/profile/VerifyCurrentPasswordUseCase";
import ChangeMentorPasswordUseCase from "../../application/use_cases/profile/ChangePasswordForMentom";
import LearnerRepository from "../../infrastructures/database/repositories/LearnerRepository";
import GetProfileForLearnerUseCase from "../../application/use_cases/profile/learner/GetProfileForLearner";
import UpdateProfileImageForLearnerUseCase from "../../application/use_cases/profile/learner/UpdateProfileImageForLearner";
import VerifyCurrentPasswordForLearnerUseCase from "../../application/use_cases/profile/learner/VerifyCurrentPasswordLearnerUseCase";
import ChangeLearnerPasswordUseCase from "../../application/use_cases/profile/learner/ChangePasswordForLearner";
import UpdateProfileLearnerByIdUseCase from "../../application/use_cases/profile/learner/UpdateProfileLearner";
import { Learner } from "../../application/entities/learner.entity";

//created the instances
const mentorRepository = new MentorRepository();
const learnerRepository = new LearnerRepository();

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

const updateProfileLearnerByIdUseCase = new UpdateProfileLearnerByIdUseCase(
  learnerRepository
);
const getProfileForLearnerUseCase = new GetProfileForLearnerUseCase(
  learnerRepository
);
const updateProfileImageOfLearnerUseCase =
  new UpdateProfileImageForLearnerUseCase(learnerRepository);
const verifyCurrentPasswordForLearnerUseCase =
  new VerifyCurrentPasswordForLearnerUseCase(learnerRepository);

const changePasswordForLearnerUseCase = new ChangeLearnerPasswordUseCase(
  learnerRepository
);

//mentor controller
class ProfileController {
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
  //update profile
  async updateProfileOfLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.userId || "";
      console.log(req.body);
      const { firstName, lastName } = req.body;
      const response = await updateProfileLearnerByIdUseCase.execute(
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
  async updateProfileImageOfLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.userId || "";
      const { profilePicture } = req.body;
      const response = await updateProfileImageOfLearnerUseCase.execute(
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
  async fetchProfileDetailsOfLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const learnerId = req.user?.userId || "";
      const response = await getProfileForLearnerUseCase.execute(learnerId);
      const { learner } = response.data as { learner: Learner[] };

      if (response && response.data) {
        res
          .status(response.statusCode)
          .json({ message: response.message, data: learner });
      } else {
        res.status(response.statusCode).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  }

  //verify current password
  async verifyPasswordForLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const learnerId = req.user?.userId || "";
      const { currentPassword } = req.body;
      const response = await verifyCurrentPasswordForLearnerUseCase.execute(
        { currentPassword },
        learnerId
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
  async changePasswordForLearner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const learnerId = req.user?.userId || "";
      const { newPassword, confirmPassword } = req.body;
      const response = await changePasswordForLearnerUseCase.execute(
        { newPassword, confirmPassword },
        learnerId
      );
      res.status(response.statusCode).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
