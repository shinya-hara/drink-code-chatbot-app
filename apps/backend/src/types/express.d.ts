import { User } from '@/domains/entities/User';
export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
