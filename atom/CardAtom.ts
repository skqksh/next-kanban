import { atom, selector } from 'recoil'
import _ from 'lodash'

import AtomKeyEnum from './AtomKeyEnum'
import CardModel, { CardStatusEnum } from '@model/CardModel'

export const CardList = atom<Record<string, CardModel>>({
  key: AtomKeyEnum.CardList,
  default: {},
})

export const CardDetailId = atom<string>({
  key: AtomKeyEnum.CardDetailId,
  default: '',
})

export const CardDetail = selector<CardModel>({
  key: AtomKeyEnum.CardDetail,
  get: ({ get }) => {
    const list = get(CardList)
    const id = get(CardDetailId)
    return _.find(list, (x) => x.id === id)
  },
})

export const SelCardStatus = atom<CardStatusEnum>({
  key: AtomKeyEnum.SelCardStatus,
  default: undefined,
})

export const CardListByStatus = selector<Record<string, CardModel>>({
  key: AtomKeyEnum.CardListByStatus,
  get: ({ get }) => {
    const list = get(CardList)
    const status = get(SelCardStatus)
    if (_.isEmpty(status)) {
      return list
    }
    return _.pickBy(list, (x) => x.status === status)
  },
})
