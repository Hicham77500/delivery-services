import { CreateOrderHandler, CreateOrderCommand } from '../application/CreateOrderHandler'
import { IOrderRepository } from '../domain/IOrderRepository'
import { Order } from '../domain/Order'

class InMemoryOrderRepo implements IOrderRepository {
  public saved: Order | null = null
  async save(order: Order): Promise<void> { this.saved = order }
  async findById(id: string): Promise<Order | null> {
    return this.saved && this.saved.id === id ? this.saved : null
  }
}

describe('CreateOrderHandler', () => {
  it('should create order successfully', async () => {
    const repo = new InMemoryOrderRepo()
    const handler = new CreateOrderHandler(repo)
    const cmd: CreateOrderCommand = {
      id: '1',
      customerId: 'cust1',
      items: [{ productId: 'prod1', quantity: 2 }]
    }
    await handler.execute(cmd)
    expect(repo.saved).not.toBeNull()
    expect(repo.saved!.id).toBe('1')
    expect(repo.saved!.customerId).toBe('cust1')
  })

  it('should throw error when items list is empty', async () => {
    const repo = new InMemoryOrderRepo()
    const handler = new CreateOrderHandler(repo)
    const cmd: CreateOrderCommand = { id: '2', customerId: 'cust2', items: [] }
    await expect(handler.execute(cmd))
      .rejects
      .toThrow('Items list cannot be empty')
  })
})
