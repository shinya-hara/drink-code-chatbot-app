import { ChatRoomRepository } from '../domains/repositories/ChatRoomRepository';
import { type User } from '../domains/entities/User';
import { type ChatRoom } from '../domains/entities/ChatRoom';

export class GetChatRoomsUseCase {
  constructor(private repository: ChatRoomRepository) {}

  async execute({ user }: { user: User }): Promise<ChatRoom[]> {
    return await this.repository.findMany(user.id);
  }
}
