import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSetRecoilState } from 'recoil'
import _ from 'lodash'

import AddColumn from './AddColumn'
import IssueBoard from './IssueBoard'
import data from '../../data'

import atom from '@atom'

const Home = (): JSX.Element => {
  const [initComplete, setInitComplete] = useState(false)

  const setIssueList = useSetRecoilState(atom.IssueList)
  const setColumnList = useSetRecoilState(atom.ColumnList)
  const setColumnOrder = useSetRecoilState(atom.ColumnOrder)

  useEffect(() => {
    setColumnList(data.columnList)
    const sortedColumnOrder = _.map(
      _.sortBy(_.toArray(data.columnList), (x) => x.order),
      (x) => x.id
    )
    setColumnOrder(sortedColumnOrder)
    setIssueList(data.issueList)
    setInitComplete(true)
  }, [])

  return (
    <Container fluid>
      {initComplete && (
        <>
          <AddColumn />
          <IssueBoard />
        </>
      )}
    </Container>
  )
}

export default Home
