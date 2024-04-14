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
    private _chatRoomId: string,
    private _id?: number,
  ) {}

  static create({
    content,
    user,
    chatRoomId,
  }: {
    content: ContentType;
    user: User;
    chatRoomId: string;
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
    id: number;
    content: string;
    createdAt: Date;
    user: User;
    chatRoomId: string;
  }) {
    const parsedContent = JSON.parse(content);
    return new ChatMessage(parsedContent, createdAt, user, chatRoomId, id);
  }

  public get id(): number {
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

  public get chatRoomId(): string {
    return this._chatRoomId;
  }
}
