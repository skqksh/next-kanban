import React from 'react'
import styled from 'styled-components'
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import Column from '@component/Column'

import atom from '@atom'

const Container = styled.div`
  display: flex;
  overflow: auto;
`

const ColumnBoard = ({}: {}): JSX.Element => {
  const [columnList, setColumnList] = useRecoilState(atom.ColumnList)
  const [columnOrder, setColumnOrder] = useRecoilState(
    atom.ColumnOrder
  )

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
                <Column
                  key={column.id}
                  column={column}
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
