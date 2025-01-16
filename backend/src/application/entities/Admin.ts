export class Admin {
  id;
  email;
  password;
  constructor(email: string, password: string, id: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
