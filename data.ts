import ColumnModel from '@model/ColumnModel'
import CardModel, { CardStatusEnum } from '@model/CardModel'

const initialData: {
  columnList: Record<string, ColumnModel>
  cardList: Record<string, CardModel>
} = {
  cardList: {
    'card-1': {
      id: 'card-1',
      name: 'Take out the garbage',
      description: 'Basement, Kitchin',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 0,
      status: CardStatusEnum.Open,
    },
    'card-2': {
      id: 'card-2',
      name: 'Watch my favorite show',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 1,
      status: CardStatusEnum.Closed,
    },
    'card-3': {
      id: 'card-3',
      name: 'Charge my phone',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 2,
      status: CardStatusEnum.Closed,
    },
    'card-4': {
      id: 'card-4',
      name: 'Cook dinner',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 3,
      status: CardStatusEnum.Open,
    },
    'card-5': {
      id: 'card-5',
      name: 'Lesson 1',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 0,
      status: CardStatusEnum.Open,
    },
    'card-6': {
      id: 'card-6',
      name: 'Lesson 2',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 0,
      status: CardStatusEnum.Open,
    },
    'card-7': {
      id: 'card-7',
      name: 'Lesson 3',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 0,
      status: CardStatusEnum.Open,
    },
    'card-8': {
      id: 'card-8',
      name: 'Lesson 4',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 1,
      status: CardStatusEnum.Open,
    },
    'card-9': {
      id: 'card-9',
      name: 'Lesson 5',
      createDate: new Date(),
      updatedDate: new Date(),
      order: 2,
      status: CardStatusEnum.Open,
    },
  },
  columnList: {
    'column-1': {
      id: 'column-1',
      name: 'To do',
      order: 1,
      cardIdList: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    'column-2': {
      id: 'column-2',
      name: 'In progress',
      order: 3,
      cardIdList: [],
    },
    'column-3': {
      id: 'column-3',
      name: 'Blocked',
      order: 2,
      cardIdList: ['card-5'],
    },
    'column-4': {
      id: 'column-4',
      name: 'Review',
      order: 5,
      cardIdList: ['card-6'],
    },
    'column-5': {
      id: 'column-5',
      name: 'done',
      order: 4,
      cardIdList: ['card-7', 'card-8', 'card-9'],
    },
  },
}

export default initialData
