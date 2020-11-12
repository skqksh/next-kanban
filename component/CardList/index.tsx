import React from 'react'
import _ from 'lodash'

import Issue from '../Card'
import IssueModel from '../../model/IssueModel'

const CardList = React.memo(
  ({ issueList }: { issueList: IssueModel[] }): JSX.Element => {
    return (
      <>
        {_.map(issueList, (issue, index) => (
          <Issue key={issue.id} issue={issue} index={index} />
        ))}
      </>
    )
  },
  (prevProps, nextProps) => nextProps.issueList === prevProps.issueList
)

export default CardList
