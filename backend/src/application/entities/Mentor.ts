// entities/Mentor.ts
export class Mentor {
  constructor(
    public id: string,
    public googleId: string | null,
    public firstName: string,
    public lastName: string | null,
    public email: string,
    public profilePicture: string | null,
    public createdCourses: string[] | null,
    public bankDetails: BankDetail[],
    public isBlocked: boolean | null,
    public password: string | null,
    public refreshToken: string | null
  ) {}
}

// // Method to check if the mentor is blocked
// isMentorBlocked(): boolean {
//   return this.isBlocked === true;
// }

// // Method to update mentor's profile picture
// updateProfilePicture(newProfilePicture: string): void {
//   this.profilePicture = newProfilePicture;
// }

// // Method to securely update password
// updatePassword(newPassword: string): void {
//   // Add any password validation logic here
//   this.password = newPassword;
// }
// }

// Subclass for bank details
export class BankDetail {
  constructor(
    public accountNumber: string | null,
    public bankName: string | null,
    public ifscCode: string | null
  ) {}
}
