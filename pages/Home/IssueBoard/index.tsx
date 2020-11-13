import React from 'react'
import styled from 'styled-components'
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import Column from '@component/Column'
import ColumnModel from '@model/ColumnModel'
import IssueModel from '@model/IssueModel'

const Container = styled.div`
  display: flex;
`

const InnerList = ({
  column,
  issueMap,
  index,
}: {
  column: ColumnModel
  issueMap: Record<string, IssueModel>
  index: number
}): JSX.Element => {
  const issueList = column.issueIdList.map(
    (issueId: string) => issueMap[issueId]
  )
  return (
    <Column column={column} issueList={issueList} index={index} />
  )
}

const ColumnBoard = ({
  columnList,
  setColumnList,
  columnOrder,
  setColumnOrder,
  issueList,
}: {
  columnList: Record<string, ColumnModel>
  setColumnList: React.Dispatch<
    React.SetStateAction<Record<string, ColumnModel>>
  >
  columnOrder: string[]
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>
  issueList: Record<string, IssueModel>
}): JSX.Element => {
  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      setColumnOrder(newColumnOrder)
      return
    }

    const home = columnList[source.droppableId]
    const foreign = columnList[destination.droppableId]

    if (home === foreign) {
      const newissueIdList = Array.from(home.issueIdList)
      newissueIdList.splice(source.index, 1)
      newissueIdList.splice(destination.index, 0, draggableId)

      const newHome = {
        ...home,
        issueIdList: newissueIdList,
      }

      setColumnList({
        ...columnList,
        [newHome.id]: newHome,
      })

      return
    }

    // moving from one list to another
    const homeissueIdList = Array.from(home.issueIdList)
    homeissueIdList.splice(source.index, 1)
    const newHome = {
      ...home,
      issueIdList: homeissueIdList,
    }

    const foreignissueIdList = Array.from(foreign.issueIdList)
    foreignissueIdList.splice(destination.index, 0, draggableId)
    const newForeign = {
      ...foreign,
      issueIdList: foreignissueIdList,
    }

    setColumnList({
      ...columnList,
      [newHome.id]: newHome,
      [newForeign.id]: newForeign,
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="all-columnList"
        direction="horizontal"
        type="column"
      >
        {(provided): JSX.Element => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columnOrder.map((columnId, index) => {
              const column = columnList[columnId]
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  issueMap={issueList}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ColumnBoard
