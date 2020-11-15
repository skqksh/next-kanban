import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'

import { Alert, Colors } from '@constant'

import ColumnModel from '@model/ColumnModel'

import CardList from '../CardList'
import { useRecoilState, useSetRecoilState } from 'recoil'
import atom from '@atom'
import { Button, Row, Col, Dropdown, Modal } from 'react-bootstrap'
import CardModel, { CardStatusEnum } from '@model/CardModel'

const Container = styled.div`
  margin: 8px;
  border: 1px solid ${Colors.line};
  background-color: white;
  border-radius: 2px;
  min-width: 220px;
  padding: 8px;

  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  position: relative;
`

const Title = styled.h3`
  padding: 8px;
`
const CardListBox = styled.div<{ isDraggingOver: boolean }>`
  transition: background-color 0.2s ease;
  background-color: ${(props): string =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  flex-grow: 1;
  min-height: 100px;
`

const AddCardBox = styled.div`
  margin-bottom: 10px;
`

const InputCardName = styled.input`
  margin-bottom: 10px;
`

const InputColumnName = styled.input`
  width: 100%;
`

const Column = ({
  column,
  index,
}: {
  column: ColumnModel
  index: number
}): JSX.Element => {
  const [showColumnEditModal, setShowColumnEditModal] = useState(
    false
  )
  const [inputColumnName, setInputColumnName] = useState(column.name)

  const [addCardMode, setAddCardMode] = useState(false)
  const [inputCardName, setInputCardName] = useState('')
  const [cardList, setCardList] = useRecoilState(atom.CardList)
  const [columnList, setColumnList] = useRecoilState(atom.ColumnList)
  const setColumnOrder = useSetRecoilState(atom.ColumnOrder)

  const inputCardNameRef = useRef<HTMLInputElement>()

  const columnCardList = _.toArray(
    _.pick(cardList, column.cardIdList)
  )

  const _addCard = (): void => {
    const _inputCardName = inputCardName.trim()
    if (_inputCardName) {
      const newCardList = _.clone(cardList)
      const cardId = `card-${new Date().getTime()}`
      const newCard: CardModel = {
        id: cardId,
        createDate: new Date(),
        updatedDate: new Date(),
        name: _inputCardName,
        order: _.size(columnCardList),
        status: CardStatusEnum.Open,
      }
      newCardList[cardId] = newCard
      setCardList(newCardList)

      const newColumn = _.clone(column)
      newColumn.cardIdList = newColumn.cardIdList.concat([cardId])
      const newColumnList = _.clone(columnList)
      newColumnList[column.id] = newColumn
      setColumnList(newColumnList)

      setInputCardName('')
    }
    setAddCardMode(false)
  }

  const _onKeyPressInputName = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Enter') {
      _addCard()
    }
  }

  const _onClickAddCardBtn = (): void => {
    setAddCardMode(true)
    setTimeout(() => {
      inputCardNameRef.current.focus()
    }, 100)
  }

  const _onClickRemoveColumnBtn = (): void => {
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
        const newColumnList = _.clone(columnList)
        delete newColumnList[column.id]
        setColumnList(newColumnList)
      },
    })
  }

  const _onClickColumnNameSaveBtn = (): void => {
    if (_.isEmpty(inputColumnName)) {
      Alert.alert({ message: 'Column name should not be empty' })
      return
    }
    if (
      _.some(
        columnList,
        (x) => x.id !== column.id && x.name === inputColumnName
      )
    ) {
      Alert.alert({
        message: `"${inputColumnName}" is already exist`,
      })
      return
    }

    const newColumnList = _.clone(columnList)
    const newColumn = _.clone(newColumnList[column.id])
    newColumn.name = inputColumnName
    newColumnList[column.id] = newColumn
    setColumnList(newColumnList)

    setShowColumnEditModal(false)
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided): JSX.Element => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Header>
            <Row>
              <Col>
                <Title {...provided.dragHandleProps}>
                  {column.name}
                </Title>
                <Modal
                  size="sm"
                  show={showColumnEditModal}
                  onHide={(): void => {
                    setShowColumnEditModal(false)
                  }}
                >
                  <Modal.Header closeButton>Column</Modal.Header>
                  <Modal.Body>
                    <InputColumnName
                      value={inputColumnName}
                      onChange={({ target: { value } }): void => {
                        setInputColumnName(value)
                      }}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={_onClickColumnNameSaveBtn}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col md={'auto'}>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(): void => {
                        setShowColumnEditModal(true)
                      }}
                    >
                      Edit Column
                    </Dropdown.Item>
                    <Dropdown.Item onClick={_onClickRemoveColumnBtn}>
                      Remove Column
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          {addCardMode ? (
            <InputCardName
              ref={inputCardNameRef}
              value={inputCardName}
              onChange={({ target: { value } }): void => {
                setInputCardName(value)
              }}
              onKeyPress={_onKeyPressInputName}
              onBlur={_addCard}
            />
          ) : (
            <AddCardBox>
              <Button
                variant={'info'}
                block
                size={'sm'}
                onClick={_onClickAddCardBtn}
              >
                + Add Card
              </Button>
            </AddCardBox>
          )}
          <Droppable droppableId={column.id} type="card">
            {(provided, snapshot): JSX.Element => (
              <CardListBox
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <CardList cardList={columnCardList} />
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
