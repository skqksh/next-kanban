import { atom } from 'recoil'
import AtomKeyEnum from './AtomKeyEnum'
import CardModel from '@model/CardModel'

export const CardList = atom<Record<string, CardModel>>({
  key: AtomKeyEnum.CardList,
  default: {},
})
