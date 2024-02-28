import express, { Request, Response } from 'express';
import { auth } from './middlewares/auth';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
