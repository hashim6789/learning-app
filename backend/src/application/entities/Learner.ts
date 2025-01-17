import Course from "./Course";

// domain/entity/Learner.ts
export class Learner {
  constructor(
    public googleId: string | null,
    public id: string,
    public firstName: string,
    public lastName: string | null,
    public email: string,
    public password: string | null,
    public profilePicture: string | null,
    public purchasedCourses: Course[] | null,
    public isBlocked: boolean | null
  ) {}
}

// export class Learner {
//   constructor(
//     public googleId: string | null,
//     public id: string,
//     public firstName: string,
//     public lastName: string | null,
//     public email: string,
//     public password: string | null,
//     public profilePicture: string | null,
//     public purchasedCourses: Course[] | null,
//     public isBlocked: boolean | null
//   ) {}
// }
