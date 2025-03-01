import { UserQuery } from "../../../../shared/types/query";
import { User } from "../../../../application/entities/user.entity";

// export interface IUserRepository {
//   fetchById(userId: string): Promise<User | null>;
//   fetchAll(): Promise<User[] | null>;
//   updateById(userId: string, data: Partial<User>): Promise<User | null>;
//   deleteById(userId: string): Promise<User | null>;
//   fetchByField(field: { [key: string]: any }): Promise<any>; // fetchByEmail(email: string): Promise<User | null>;
//   // fetchByRefreshToken(token: string): Promise<User | null>;
//   // deleteRefreshToken(adminId: string): Promise<User | null>;
// }

// application/IRepositories/IUserRepository.ts
export interface IUserRepository<T> {
  fetchByField(field: { [key: string]: any }): Promise<T | null>;
  updateById(userId: string, updateData: Partial<T>): Promise<T | null>;
  fetchById(userId: string): Promise<T | null>;
  fetchAll(query: UserQuery): Promise<{ users: T[]; docCount: number } | null>;
  deleteById(userId: string): Promise<T | null>;
  create(data: T): Promise<T | null>;
}
