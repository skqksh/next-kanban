import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import _ from 'lodash'
import { useRecoilState } from 'recoil'

import atom from '@atom'

import { Colors } from '@constant'
import CardModel, { CardStatusEnum } from '@model/CardModel'
import { Text } from '@component/Text'

const Container = styled.div`
  border: 1px solid ${Colors.line};
  padding: 20px;
`

const EditMode = styled.div`
  width: 100%;
  cursor: pointer;
  border: 1px solid white;
  :hover {
    border: 1px solid #00000000;
    background-color: #eee;
    border-radius: 5px;
  }
`

const CardName = styled.div`
  font-size: 22px;
  font-weight: bold;
  border: 2px solid #00000000;
`

const CardNameInput = styled.input`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  border-color: #00000000;
`
const ItemTitle = styled.div`
  font-weight: bold;
  color: ${Colors.text};
`

const CardDescTextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  border-color: #00000000;
  min-height: 300px;
  background-color: #eee;
`

const Description = styled.div`
  padding: 10px;
  min-height: 300px;
  white-space: pre-wrap;
`

const ButtonBox = styled.div`
  text-align: right;
`

const CardDetail = ({ card }: { card: CardModel }): JSX.Element => {
  const [nameEditMode, setNameEditMode] = useState(false)
  const [descEditMode, setDescEditMode] = useState(false)

  const [inputName, setInputName] = useState(card.name)
  const [inputDesc, setInputDesc] = useState(card.description)
  const cardNameInputRef = useRef<HTMLInputElement>()
  const cardDescInputRef = useRef<HTMLTextAreaElement>()

  const [cardList, setCardList] = useRecoilState(atom.CardList)

  const _onChangeStatus = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>): void => {
    const newCard = _.clone(card)
    newCard.status = value as CardStatusEnum
    newCard.updatedDate = new Date()
    const newCardList = _.clone(cardList)
    newCardList[card.id] = newCard
    setCardList(newCardList)
  }

  const _updateName = (): void => {
    const newCard = _.clone(card)
    newCard.name = inputName
    newCard.updatedDate = new Date()
    const newCardList = _.clone(cardList)
    newCardList[card.id] = newCard
    setCardList(newCardList)
    setNameEditMode(false)
  }

  const _updateDesc = (): void => {
    const newCard = _.clone(card)
    newCard.description = inputDesc
    newCard.updatedDate = new Date()
    const newCardList = _.clone(cardList)
    newCardList[card.id] = newCard
    setCardList(newCardList)
    setDescEditMode(false)
  }

  const _cancelUpdateDesc = (): void => {
    setInputDesc(card.description)
    setDescEditMode(false)
  }

  const _onKeyPressName = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Enter') {
      _updateName()
    }
  }

  return (
    <Container>
      <Modal.Header closeButton>
        {nameEditMode ? (
          <CardNameInput
            ref={cardNameInputRef}
            value={inputName}
            onChange={({ target: { value } }): void => {
              setInputName(value)
            }}
            onKeyPress={_onKeyPressName}
            onBlur={_updateName}
          />
        ) : (
          <EditMode
            onClick={(): void => {
              setNameEditMode(true)
              setTimeout(() => {
                cardNameInputRef.current.focus()
              }, 100)
            }}
          >
            <CardName>{card.name}</CardName>
          </EditMode>
        )}
      </Modal.Header>
      <Row>
        <Col md={8}>
          <ItemTitle>Description</ItemTitle>
          {descEditMode ? (
            <>
              <CardDescTextArea
                ref={cardDescInputRef}
                value={inputDesc}
                onChange={({ target: { value } }): void => {
                  setInputDesc(value)
                }}
              />
              <ButtonBox>
                <Button
                  style={{ marginRight: 5 }}
                  onClick={_updateDesc}
                >
                  save
                </Button>
                <Button variant="danger" onClick={_cancelUpdateDesc}>
                  cancel
                </Button>
              </ButtonBox>
            </>
          ) : (
            <EditMode
              onClick={(): void => {
                setDescEditMode(true)
                setTimeout(() => {
                  cardDescInputRef.current.focus()
                }, 100)
              }}
            >
              <Description>{card.description}</Description>
            </EditMode>
          )}
        </Col>
        <Col md={4}>
          <ItemTitle>Status</ItemTitle>
          <select onChange={_onChangeStatus} value={card.status}>
            {_.map(CardStatusEnum, (v) => {
              return <option key={v}>{v}</option>
            })}
          </select>
          <ItemTitle>Created</ItemTitle>
          <Text>
            {moment(card.createDate).format('YYYY-MM-DD HH:mm')}
          </Text>
          <ItemTitle>Updated</ItemTitle>
          <Text>{moment(card.updatedDate).fromNow()}</Text>
        </Col>
      </Row>
    </Container>
  )
}

export default CardDetail
