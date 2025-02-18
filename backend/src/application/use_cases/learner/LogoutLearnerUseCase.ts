// import { ResponseModel } from "../../../shared/types/ResponseModel";
// import { ILearnerRepository } from "../../IRepositories/ILearnerRepository";

// class LogoutLearnerUseCase {
//   private learnerRepository: ILearnerRepository;
//   constructor(learnerRepository: ILearnerRepository) {
//     this.learnerRepository = learnerRepository;
//   }

//   async execute(learnerId: string): Promise<ResponseModel> {
//     const learner = await this.learnerRepository.fetchLearnerById(learnerId);
//     if (!learner) {
//       return {
//         statusCode: 404,
//         success: false,
//         message: "The learner doesn't exist!",
//       };
//     }

//     const unRefreshedLearner = await this.learnerRepository.deleteRefreshToken(
//       learner.id
//     );
//     if (!unRefreshedLearner) {
//       return {
//         statusCode: 400,
//         success: false,
//         message: "some thing wrong when deleting the refreshToken!",
//       };
//     }

//     return {
//       statusCode: 200,
//       success: true,
//       message: "Logout successful",
//       data: {
//         learner: unRefreshedLearner,
//       },
//     };
//   }
// }

// export default LogoutLearnerUseCase;
