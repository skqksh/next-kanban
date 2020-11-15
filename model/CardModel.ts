export enum CardStatusEnum {
  Open = 'Open',
  Closed = 'Closed',
}

export default interface CardModel {
  id: string
  name: string
  description?: string
  createDate: Date
  updatedDate: Date
  order: number
  status: CardStatusEnum
}
