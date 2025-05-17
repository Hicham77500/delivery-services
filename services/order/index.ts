import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { CreateOrderHandler } from './application/CreateOrderHandler'
import { InMemoryOrderRepo } from './infra/InMemoryOrderRepo'

const app = express()
app.use(bodyParser.json())

const handler = new CreateOrderHandler(new InMemoryOrderRepo())
const PORT = Number(process.env.PORT || 3001)

app.post('/orders', async (req: Request, res: Response) => {
  try {
    await handler.execute(req.body)
    res.status(201).json({ id: req.body.id })
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Unknown error' })
  }
})

app.listen(PORT, () => {
  console.log(`Order service listening on port ${PORT}`)
})
