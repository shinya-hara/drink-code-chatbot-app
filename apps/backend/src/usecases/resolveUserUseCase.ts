import { UserRepository } from '../domains/repositories/UserRepository';
import { User, UserType } from '../domains/entities/User';
import { UserId } from '@/domains/valueObject/UserId';

export class ResolveUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(supabaseUserId: UserId) {
    const foundUser = await this.repository.findUniqueById(supabaseUserId);
    if (foundUser) return foundUser;

    // ユーザーがいなければ新規作成する
    const userInstance = User.create({
      id: supabaseUserId,
      type: UserType.User,
    });
    const createdUser = this.repository.create(userInstance);
    return createdUser;
  }
}
