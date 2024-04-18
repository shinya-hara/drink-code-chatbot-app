import { ChatRoomRepository } from '../domains/repositories/ChatRoomRepository';
import { User } from '../domains/entities/User';
import { ChatRoom } from '../domains/entities/ChatRoom';

export class GetChatRoomsUseCase {
  constructor(private repository: ChatRoomRepository) {}

  async execute({ user }: { user: User }): Promise<ChatRoom[]> {
    return await this.repository.findMany(user.id);
  }
}
