import express, { Request, Response } from 'express';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { CreateChatRoomUseCase } from './usecases/createChatRoomUseCase';
import { prisma } from './lib/prisma';

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

app.post('/messages', (req: Request<{}, {}, MessageRequest>, res: Response) => {
  const message = req.body.message;
  res.status(200).json({ message });
});

app.get('/messages', (req, res) => {
  const messages = ['message1', 'message2'];
  res.status(200).json({ messages });
});

app.post('/chat-rooms', async (req, res) => {
  const useCase = new CreateChatRoomUseCase(prisma);
  const result = await useCase.execute({ user: req.user, name: req.body.name });
  res.status(201).json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
