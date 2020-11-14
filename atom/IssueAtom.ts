import { atom } from 'recoil'
import AtomKeyEnum from './AtomKeyEnum'
import IssueModel from '@model/IssueModel'

export const IssueList = atom<Record<string, IssueModel>>({
  key: AtomKeyEnum.IssueList,
  default: {},
})
