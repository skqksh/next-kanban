import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'

import { Alert, Colors } from '@constant'

import ColumnModel from '@model/ColumnModel'

import CardList from '../CardList'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import atom from '@atom'

const Container = styled.div`
  margin: 8px;
  border: 1px solid ${Colors.line};
  background-color: white;
  border-radius: 2px;
  min-width: 220px;

  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  position: relative;
`
const RemoveBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 15px;
  background-color: white;
  border: none;
  :focus {
    outline: none;
  }
`
const Title = styled.h3`
  padding: 8px;
`
const CardListBox = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props): string =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`

const Column = ({
  column,
  index,
}: {
  column: ColumnModel
  index: number
}): JSX.Element => {
  const cardList = _.toArray(
    _.pick(useRecoilValue(atom.CardList), column.cardIdList)
  )

  const setColumnOrder = useSetRecoilState(atom.ColumnOrder)

  const _onRemoveBtnClick = (): void => {
    const remainedCardLen = _.size(column.cardIdList)
    if (remainedCardLen > 0) {
      Alert.alert({
        message: `There ${
          remainedCardLen === 1
            ? 'is remaind card'
            : 'are remaind cards'
        } in the column.`,
      })
      return
    }
    Alert.confirm({
      message: `Do you really want to delete "${column.name}" colunm?`,
      onConfirmClick: () => {
        setColumnOrder((ori) => {
          return ori.filter((x) => x !== column.id)
        })
        // TODO : remove it in columnList
      },
    })
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided): JSX.Element => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Header>
            <Title {...provided.dragHandleProps}>{column.name}</Title>
            <RemoveBtn onClick={_onRemoveBtnClick}>X</RemoveBtn>
          </Header>

          <Droppable droppableId={column.id} type="card">
            {(provided, snapshot): JSX.Element => (
              <CardListBox
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <CardList cardList={cardList} />
                {provided.placeholder}
              </CardListBox>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column
