import { ChatMessageId } from '../valueObject/ChatMessageId';
import { ChatRoomId } from '../valueObject/ChatRoomId';
import { ChatRoom } from './ChatRoom';
import { User } from './User';

type ContentType = {
  type: 'text';
  text: string;
};

export class ChatMessage {
  constructor(
    private _content: ContentType,
    private _createdAt: Date,
    private _user: User,
    private _chatRoomId: ChatRoomId,
    private _id?: ChatMessageId,
  ) {}

  static create({
    content,
    user,
    chatRoomId,
  }: {
    content: ContentType;
    user: User;
    chatRoomId: ChatRoomId;
  }) {
    const now = new Date();
    return new ChatMessage(content, now, user, chatRoomId);
  }

  static reconstruct({
    id,
    content,
    createdAt,
    user,
    chatRoomId,
  }: {
    id: ChatMessageId;
    content: string;
    createdAt: Date;
    user: User;
    chatRoomId: ChatRoomId;
  }) {
    const parsedContent = JSON.parse(content);
    return new ChatMessage(parsedContent, createdAt, user, chatRoomId, id);
  }

  public get id(): ChatMessageId {
    if (this._id == null) throw new Error();
    return this._id;
  }

  public get content(): ContentType {
    return this._content;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get user(): User {
    return this._user;
  }

  public get chatRoomId(): ChatRoomId {
    return this._chatRoomId;
  }
}
