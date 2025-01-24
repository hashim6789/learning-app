import { UserStatus } from "./UserStatus";

export interface Learner {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  profilePicture: string;
}
