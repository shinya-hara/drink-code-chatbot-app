import { PrismaClient, UserType } from '@prisma/client';

export class ResolveUserUseCase {
  constructor(private _prisma: PrismaClient) {}

  async execute(supabaseUserId: string) {
    const user = await this._prisma.user.findUnique({
      where: {
        id: supabaseUserId,
      },
    });
    if (user) return user;

    // ユーザーがいなければ新規作成する
    const createdUser = this._prisma.user.create({
      data: {
        id: supabaseUserId,
        type: UserType.USER,
      },
    });
    return createdUser;
  }
}
