export class Admin {
  id;
  email;
  password;
  isBlocked;
  isVerified;
  constructor(email: string, password: string | null, id: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.isBlocked = false;
    this.isVerified = true;
  }

  //to remove the sensitive data
  removeSensitive() {
    this.password = null;
  }
}
