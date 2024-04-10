import { type User } from '@prisma/client';
import { ChatRoomRepository } from '../domains/repositories/ChatRoomRepository';
import { ChatRoom } from '../domains/entities/ChatRoom';

export class CreateChatRoomUseCase {
  constructor(private repository: ChatRoomRepository) {}

  async execute({
    user,
    name,
  }: {
    user: User;
    name: string;
  }): Promise<ChatRoom> {
    return await this.repository.create(user.id, name);
  }
}
