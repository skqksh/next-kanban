import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import { Colors } from '@constant'

import CardModel from '@model/CardModel'

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid ${Colors.line};
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props): string =>
    props.isDragging ? 'lightgreen' : 'white'};
`

const Card = ({
  card,
  index,
}: {
  card: CardModel
  index: number
}): JSX.Element => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot): JSX.Element => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {card.name}
        </Container>
      )}
    </Draggable>
  )
}

export default Card
