import { UserStatus } from "./UserStatus";

export interface Mentor {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  profilePicture: string;
}
