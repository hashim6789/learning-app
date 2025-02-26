export class Otp {
  id;
  otp;
  userId;
  expiresIn;
  constructor(id: string, userId: string, otp: string, expiresIn: number) {
    this.id = id;
    this.userId = userId;
    this.otp = otp;
    this.expiresIn = expiresIn;
  }
}
