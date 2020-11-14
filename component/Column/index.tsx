import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Colors } from '@constant'

import ColumnModel from '@model/ColumnModel'
import IssueModel from '@model/IssueModel'

import CardList from '../CardList'

const Container = styled.div`
  margin: 8px;
  border: 1px solid ${Colors.line};
  background-color: white;
  border-radius: 2px;
  min-width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const IssueList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props): string =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`

const Column = ({
  column,
  issueList,
  index,
}: {
  column: ColumnModel
  issueList: IssueModel[]
  index: number
}): JSX.Element => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided): JSX.Element => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="issue">
            {(provided, snapshot): JSX.Element => (
              <IssueList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <CardList issueList={issueList} />
                {provided.placeholder}
              </IssueList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column
