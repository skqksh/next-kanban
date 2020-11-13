import ColumnModel from '@model/ColumnModel'
import IssueModel from '@model/IssueModel'

const initialData: {
  columnList: Record<string, ColumnModel>
  columnOrder: string[]
  issueList: Record<string, IssueModel>
} = {
  issueList: {
    'issue-1': { id: 'issue-1', content: 'Take out the garbage' },
    'issue-2': { id: 'issue-2', content: 'Watch my favorite show' },
    'issue-3': { id: 'issue-3', content: 'Charge my phone' },
    'issue-4': { id: 'issue-4', content: 'Cook dinner' },
    'issue-5': { id: 'issue-5', content: 'Lesson 1' },
    'issue-6': { id: 'issue-6', content: 'Lesson 2' },
    'issue-7': { id: 'issue-7', content: 'Lesson 3' },
    'issue-8': { id: 'issue-8', content: 'Lesson 4' },
    'issue-9': { id: 'issue-9', content: 'Lesson 5' },
  },
  columnList: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      issueIdList: ['issue-1', 'issue-2', 'issue-3', 'issue-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      issueIdList: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Blocked',
      issueIdList: ['issue-5'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Review',
      issueIdList: ['issue-6'],
    },
    'column-5': {
      id: 'column-5',
      title: 'done',
      issueIdList: ['issue-7', 'issue-8', 'issue-9'],
    },
  },
  // Facilitate reordering of the columnList
  columnOrder: [
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5',
  ],
}

export default initialData
