import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import IssueModel from '@model/IssueModel'

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props): string =>
    props.isDragging ? 'lightgreen' : 'white'};
`

const Card = ({
  issue,
  index,
}: {
  issue: IssueModel
  index: number
}): JSX.Element => {
  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot): JSX.Element => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {issue.content}
        </Container>
      )}
    </Draggable>
  )
}

export default Card
