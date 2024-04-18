import { User } from '@/domains/entities/User';
import { ChatRoomRepository } from '../domains/repositories/ChatRoomRepository';
import { ChatRoom } from '../domains/entities/ChatRoom';
import { ChatRoomName } from '@/domains/valueObject/chatRoomName';

export class CreateChatRoomUseCase {
  constructor(private repository: ChatRoomRepository) {}

  async execute({
    user,
    name,
  }: {
    user: User;
    name: ChatRoomName;
  }): Promise<ChatRoom> {
    return await this.repository.create(user.id, name);
  }
}
