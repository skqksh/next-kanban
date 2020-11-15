import React from 'react'
import styled from 'styled-components'
import {
  DragDropContext,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { useRecoilState, useRecoilValue } from 'recoil'
import _ from 'lodash'

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
  const [cardList, setCardList] = useRecoilState(atom.CardList)

  const _updateCardOrder = ({
    cardIdList,
  }: {
    cardIdList: string[]
  }): void => {
    const newCardList = _.clone(cardList)
    _.forEach(cardIdList, (id, index) => {
      const newCard = _.clone(cardList[id])
      newCard.order = index
      newCardList[id] = newCard
    })
    setCardList(newCardList)
  }

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
      const newcardIdList = Array.from(home.cardIdList)
      newcardIdList.splice(source.index, 1)
      newcardIdList.splice(destination.index, 0, draggableId)
      _updateCardOrder({ cardIdList: newcardIdList })
      const newHome = {
        ...home,
        cardIdList: newcardIdList,
      }

      setColumnList({
        ...columnList,
        [newHome.id]: newHome,
      })

      return
    }

    // moving from one list to another
    const homecardIdList = Array.from(home.cardIdList)
    homecardIdList.splice(source.index, 1)
    _updateCardOrder({ cardIdList: homecardIdList })
    const newHome = {
      ...home,
      cardIdList: homecardIdList,
    }

    const foreigncardIdList = Array.from(foreign.cardIdList)
    foreigncardIdList.splice(destination.index, 0, draggableId)
    _updateCardOrder({ cardIdList: foreigncardIdList })
    const newForeign = {
      ...foreign,
      cardIdList: foreigncardIdList,
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
            <ColumnList columnOrder={columnOrder} />
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const ColumnList = React.memo(
  ({ columnOrder }: { columnOrder: string[] }): JSX.Element => {
    const columnList = useRecoilValue(atom.ColumnList)
    return (
      <>
        {_.map(columnOrder, (columnId, index) => {
          const column = columnList[columnId]
          return (
            <Column key={column.id} column={column} index={index} />
          )
        })}
      </>
    )
  },
  (prevProps, nextProps) =>
    nextProps.columnOrder === prevProps.columnOrder
)

export default ColumnBoard
