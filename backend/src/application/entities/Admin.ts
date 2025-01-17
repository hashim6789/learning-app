export class Admin {
  id;
  email;
  password;
  constructor(email: string, password: string | null, id: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
