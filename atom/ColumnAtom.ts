import { atom } from 'recoil'
import AtomKeyEnum from './AtomKeyEnum'
import ColumnModel from '@model/ColumnModel'

export const ColumnList = atom<Record<string, ColumnModel>>({
  key: AtomKeyEnum.ColumnList,
  default: {},
})

export const ColumnOrder = atom<string[]>({
  key: AtomKeyEnum.ColumnOrder,
  default: [],
})
