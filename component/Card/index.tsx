import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Badge } from 'react-bootstrap'

import { Colors } from '@constant'

import CardModel from '@model/CardModel'
import { useSetRecoilState } from 'recoil'
import atom from '@atom'

const Container = styled.div<{ isDragging: boolean }>`
  position: relative;
  border: 1px solid ${Colors.line};
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props): string =>
    props.isDragging ? 'lightgreen' : 'white'};
`

const StatusBox = styled.div`
  position: absolute;
  top: -10px;
  left: -5px;
`

const Card = ({
  card,
  index,
}: {
  card: CardModel
  index: number
}): JSX.Element => {
  const setCardDetailId = useSetRecoilState(atom.CardDetailId)
  const _onClick = (): void => {
    setCardDetailId(card.id)
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot): JSX.Element => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={_onClick}
        >
          {card.name}
          <StatusBox>
            {card.status === 'Open' ? (
              <Badge variant="success">Open</Badge>
            ) : (
              <Badge variant="dark">Close</Badge>
            )}
          </StatusBox>
        </Container>
      )}
    </Draggable>
  )
}

export default Card
