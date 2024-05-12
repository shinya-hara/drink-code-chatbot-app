import { ChatRoomName } from './ChatRoomName';

describe('ChatRoomName', () => {
  it('指定したチャットルーム名でインスタンス化できる', () => {
    // WHEN
    const chatRoomName = new ChatRoomName('ChatRoom1');

    // THEN
    expect(chatRoomName.value).toBe('ChatRoom1');
  });

  it('チャットルーム名が空文字だとエラーが発生する', () => {
    // WHEN
    const createChatRoomName = () => new ChatRoomName('');

    // THEN
    expect(createChatRoomName).toThrow();
  });

  it('チャットルーム名がスペースだけだとエラーが発生する', () => {
    // WHEN
    const createChatRoomName = () => new ChatRoomName(' ');

    // THEN
    expect(createChatRoomName).toThrow();
  });
});
