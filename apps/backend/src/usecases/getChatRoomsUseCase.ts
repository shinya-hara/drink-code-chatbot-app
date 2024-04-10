import { ChatRoomRepository } from '../domains/repositories/ChatRoomRepository';
import { ChatRoom } from '../domains/entities/ChatRoom';
import { type User } from '@prisma/client';

export class GetChatRoomsUseCase {
  constructor(private repository: ChatRoomRepository) {}

  async execute({ user }: { user: User }): Promise<ChatRoom[]> {
    return await this.repository.findMany(user.id);
  }
}
