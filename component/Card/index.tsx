import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Badge } from 'react-bootstrap'

import { Colors } from '@constant'

import CardModel from '@model/CardModel'
import { useSetRecoilState } from 'recoil'
import atom from '@atom'

const Container = styled.div<{ isDragging: boolean }>`
  background-color: ${(props): string =>
    props.isDragging ? 'lightgreen' : 'white'};
`

const CardBox = styled.div`
  position: relative;
  border: 1px solid ${Colors.line};
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`
const CardName = styled.div`
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const StatusBox = styled.div`
  position: absolute;
  top: -10px;
  left: -5px;
`

export const Card = ({ card }: { card: CardModel }): JSX.Element => {
  const setCardDetailId = useSetRecoilState(atom.CardDetailId)
  const _onClick = (): void => {
    setCardDetailId(card.id)
  }

  return (
    <CardBox>
      <div onClick={_onClick}>
        <CardName>{card.name}</CardName>
        <StatusBox>
          {card.status === 'Open' ? (
            <Badge variant="success">Open</Badge>
          ) : (
            <Badge variant="dark">Close</Badge>
          )}
        </StatusBox>
      </div>
    </CardBox>
  )
}

const DraggableCard = ({
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
          <Card card={card} />
        </Container>
      )}
    </Draggable>
  )
}

export default DraggableCard
