import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import _ from 'lodash'

import ColumnModel from '@model/ColumnModel'
import IssueModel from '@model/IssueModel'

import AddColumn from './AddColumn'
import IssueBoard from './IssueBoard'
import data from '../../data'

const Home = (): JSX.Element => {
  const [columnOrder, setColumnOrder] = useState<string[]>(
    data.columnOrder
  )
  const [columnList, setColumnList] = useState<
    Record<string, ColumnModel>
  >(data.columnList)
  const [issueList] = useState<Record<string, IssueModel>>(
    data.issueList
  )

  const addColumn = ({ title }: { title: string }): void => {
    const columnId = `column-${_.size(columnList) + 1}`
    const newColumn: ColumnModel = {
      id: columnId,
      title,
      issueIdList: [],
    }
    setColumnList((ori) => {
      return {
        ...ori,
        [columnId]: newColumn,
      }
    })
    setColumnOrder((ori) => {
      return ori.concat([columnId])
    })
  }

  return (
    <Container fluid>
      <AddColumn {...{ addColumn }} />
      <IssueBoard
        {...{
          columnOrder,
          setColumnOrder,
          columnList,
          setColumnList,
          issueList,
        }}
      />
    </Container>
  )
}

export default Home
