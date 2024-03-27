import { UserRepository } from '../domains/repositories/UserRepository';
import { User, UserType } from '../domains/entities/User';

export class ResolveUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(supabaseUserId: string) {
    const foundUser = await this.repository.findUniqueById(supabaseUserId);
    if (foundUser) return foundUser;

    // ユーザーがいなければ新規作成する
    const userInstance = User.create({ type: UserType.User });
    const createdUser = this.repository.create(userInstance);
    return createdUser;
  }
}
