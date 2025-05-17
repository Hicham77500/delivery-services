export interface OrderProps {
  id: string
  customerId: string
  items: { productId: string; quantity: number }[]
  status: 'CREATED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED'
  createdAt: Date
  updatedAt: Date
}

export class Order {
  private props: OrderProps

  constructor(props: OrderProps) {
    this.props = props
  }

  get id(): string { return this.props.id }
  get customerId(): string { return this.props.customerId }
  get items(): { productId: string; quantity: number }[] { return this.props.items }
  get status(): string { return this.props.status }
  get createdAt(): Date { return this.props.createdAt }
  get updatedAt(): Date { return this.props.updatedAt }

  // méthodes métier éventuelles…
}
