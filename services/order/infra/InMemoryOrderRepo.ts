import { IOrderRepository } from '../domain/IOrderRepository'
import { Order } from '../domain/Order'

export class InMemoryOrderRepo implements IOrderRepository {
  private store: Record<string, Order> = {}

  async save(order: Order): Promise<void> {
    this.store[order.id] = order
  }

  async findById(id: string): Promise<Order | null> {
    return this.store[id] || null
  }
}
