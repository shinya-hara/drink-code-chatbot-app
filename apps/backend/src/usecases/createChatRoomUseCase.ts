import { ChatRoomRepository } from '../domains/repositories/ChatRoomRepository';
import { type User } from '@/domains/entities/User';
import { type ChatRoom } from '@/domains/entities/ChatRoom';
import { type ChatRoomName } from '@/domains/valueObject/ChatRoomName';

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
