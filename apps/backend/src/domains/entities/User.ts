import crypto from 'crypto';
import { UserId } from '../valueObject/userId';

export const UserType = { User: 'USER', Bot: 'BOT' } as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export class User {
  private constructor(
    private _id: UserId,
    private _type: UserType,
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  static create({
    id = new UserId(crypto.randomUUID()),
    type,
  }: {
    id?: UserId;
    type: UserType;
  }) {
    const now = new Date();
    return new User(id, type, now, now);
  }

  static reconstruct({
    id,
    type,
    createdAt,
    updatedAt,
  }: {
    id: UserId;
    type: UserType;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new User(id, type, createdAt, updatedAt);
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  isUser() {
    return this.type === UserType.User;
  }
}
