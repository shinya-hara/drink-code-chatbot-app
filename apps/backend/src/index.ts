import express, { Request, Response } from 'express';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { prisma } from './lib/prisma';
import { CreateChatRoomUseCase } from './usecases/createChatRoomUseCase';
import { CreateMessageUseCase } from './usecases/createMessageUseCase';
import { GetChatRoomsUseCase } from './usecases/getChatRoomsUseCase';
import { GetChatMessagesUseCase } from './usecases/getChatMessagesUseCase';

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
  const useCase = new GetChatRoomsUseCase(prisma);
  const result = await useCase.execute({ user: req.user });
  res.status(200).json(result);
});

app.post('/chat-rooms', async (req, res) => {
  const useCase = new CreateChatRoomUseCase(prisma);
  const result = await useCase.execute({ user: req.user, name: req.body.name });
  res.status(201).json(result);
});

app.get('/chat-rooms/:id/messages', async (req, res) => {
  const useCase = new GetChatMessagesUseCase(prisma);
  const result = await useCase.execute({
    user: req.user,
    chatRoomId: req.params.id,
  });
  res.status(200).json(result);
});

app.post('/messages', async (req, res) => {
  const useCase = new CreateMessageUseCase(prisma);
  const result = await useCase.execute({
    user: req.user,
    message: req.body.message,
    chatRoomId: req.body.chatRoomId,
  });
  res.status(201).json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
