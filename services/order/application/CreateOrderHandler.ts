import { Order } from '../domain/Order'
import { IOrderRepository } from '../domain/IOrderRepository'

export interface CreateOrderCommand {
  id: string
  customerId: string
  items: { productId: string; quantity: number }[]
}

export class CreateOrderHandler {
  constructor(private repo: IOrderRepository) {}

  async execute(cmd: CreateOrderCommand): Promise<void> {
    if (!cmd.items || cmd.items.length === 0) {
      throw new Error('Items list cannot be empty')
    }
    const now = new Date()
    const order = new Order({
      id: cmd.id,
      customerId: cmd.customerId,
      items: cmd.items,
      status: 'CREATED',
      createdAt: now,
      updatedAt: now,
    })
    await this.repo.save(order)
  }
}
