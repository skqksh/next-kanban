const initialData = {
  issueList: {
    'issue-1': { id: 'issue-1', content: 'Take out the garbage' },
    'issue-2': { id: 'issue-2', content: 'Watch my favorite show' },
    'issue-3': { id: 'issue-3', content: 'Charge my phone' },
    'issue-4': { id: 'issue-4', content: 'Cook dinner' },
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
  },
  // Facilitate reordering of the columnList
  columnOrder: ['column-1', 'column-2'],
}

export default initialData
