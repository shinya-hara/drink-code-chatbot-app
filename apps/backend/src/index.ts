import express, { Request, Response } from 'express'

const app = express()
const port = 3001

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

interface MessageRequest {
  message: string
}

app.post('/messages', (req: Request<{}, {}, MessageRequest>, res: Response) => {
  const message = req.body.message
  res.status(200).json({ message })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
