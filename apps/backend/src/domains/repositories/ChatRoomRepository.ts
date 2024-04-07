import { ChatRoom } from '../entities/ChatRoom';

export interface ChatRoomRepository {
  findMany(userId: string): Promise<ChatRoom[]>;
  create(userId: string, name: string): Promise<ChatRoom>;
}
