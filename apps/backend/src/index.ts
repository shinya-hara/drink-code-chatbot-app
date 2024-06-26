import express, { Request, Response } from 'express';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { prisma } from './lib/prisma';
import { CreateChatRoomUseCase } from './usecases/createChatRoomUseCase';
import { CreateMessageUseCase } from './usecases/createMessageUseCase';
import { GetChatRoomsUseCase } from './usecases/getChatRoomsUseCase';
import { GetChatMessagesUseCase } from './usecases/getChatMessagesUseCase';
import { ChatRoomRepositoryImpl } from './repositories/supabase/ChatRoomRepositoryImpl';
import { ChatMessageRepositoryImpl } from './repositories/supabase/ChatMessageRepositoryImpl';
import { ChatRoomName } from './domains/valueObject/ChatRoomName';
import { ChatRoomId } from './domains/valueObject/ChatRoomId';

dotenv.config();
const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());

app.use(auth);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ user: req.body.user });
});

interface MessageRequest {
  message: string;
}

// app.post('/messages', (req: Request<{}, {}, MessageRequest>, res: Response) => {
//   const message = req.body.message;
//   res.status(200).json({ message });
// });

// app.get('/messages', (req, res) => {
//   const messages = ['message1', 'message2'];
//   res.status(200).json({ messages });
// });

app.get('/chat-rooms', async (req, res) => {
  const useCase = new GetChatRoomsUseCase(new ChatRoomRepositoryImpl(prisma));
  const _result = await useCase.execute({ user: req.user });
  const result = _result.map((chatRoom) => {
    return {
      id: chatRoom.id.value,
      name: chatRoom.name.value,
    };
  });
  res.status(200).json(result);
});

app.post('/chat-rooms', async (req: Request<{}, {}, { name: string }>, res) => {
  const useCase = new CreateChatRoomUseCase(new ChatRoomRepositoryImpl(prisma));
  const result = await useCase.execute({
    user: req.user,
    name: new ChatRoomName(req.body.name),
  });
  res.status(201).json(result);
});

app.get('/chat-rooms/:id/messages', async (req, res) => {
  const useCase = new GetChatMessagesUseCase(
    new ChatMessageRepositoryImpl(prisma),
    prisma,
  );
  const { messages: _messages } = await useCase.execute({
    user: req.user,
    chatRoomId: new ChatRoomId(req.params.id),
  });
  const result = {
    messages: _messages.map((message) => {
      return {
        id: message.id.value,
        content: message.content,
        userId: message.user.id.value,
        chatRoomId: message.chatRoomId.value,
        createdAt: message.createdAt,
      };
    }),
  };

  res.status(200).json(result);
});

app.post(
  '/messages',
  async (
    req: Request<{}, {}, { message: string; chatRoomId: string }>,
    res,
  ) => {
    const useCase = new CreateMessageUseCase(
      new ChatMessageRepositoryImpl(prisma),
    );
    const result = await useCase.execute({
      user: req.user,
      message: req.body.message,
      chatRoomId: new ChatRoomId(req.body.chatRoomId),
    });
    res.status(201).json(result);
  },
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
