import ColumnModel from '@model/ColumnModel'
import IssueModel from '@model/IssueModel'

const initialData: {
  columnList: Record<string, ColumnModel>
  issueList: Record<string, IssueModel>
} = {
  issueList: {
    'issue-1': { id: 'issue-1', description: 'Take out the garbage' },
    'issue-2': {
      id: 'issue-2',
      description: 'Watch my favorite show',
    },
    'issue-3': { id: 'issue-3', description: 'Charge my phone' },
    'issue-4': { id: 'issue-4', description: 'Cook dinner' },
    'issue-5': { id: 'issue-5', description: 'Lesson 1' },
    'issue-6': { id: 'issue-6', description: 'Lesson 2' },
    'issue-7': { id: 'issue-7', description: 'Lesson 3' },
    'issue-8': { id: 'issue-8', description: 'Lesson 4' },
    'issue-9': { id: 'issue-9', description: 'Lesson 5' },
  },
  columnList: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      order: 1,
      issueIdList: ['issue-1', 'issue-2', 'issue-3', 'issue-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      order: 3,
      issueIdList: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Blocked',
      order: 2,
      issueIdList: ['issue-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Review',
      order: 5,
      issueIdList: ['issue-6'],
    },
    'column-5': {
      id: 'column-5',
      title: 'done',
      order: 4,
      issueIdList: ['issue-7', 'issue-8', 'issue-9'],
    },
  },
}

export default initialData
