import { type User } from 'prisma';
export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
