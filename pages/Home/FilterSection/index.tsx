import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import { CardStatusEnum } from '@model/CardModel'
import { Text } from '@component/Text'
import { useRecoilState, useRecoilValue } from 'recoil'
import atom from '@atom'
import { Colors } from '@constant'
import { Card } from '@component/Card'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  border-left: 1px solid ${Colors.line};
  background-color: white;
  min-height: 100%;
  min-width: 250px;
  z-index: 100;
`

const FilterTitle = styled(Text)`
  padding: 8px;
  font-weight: bold;
  font-size: 16px;
`

const FilterItemText = styled(Text)<{ selected: boolean }>`
  display: inline-block;
  padding: 8px;
  cursor: pointer;
  font-size: 18px;
  color: ${(props): string => (props.selected ? 'white' : '#333')};
  background-color: ${(props): string =>
    props.selected ? Colors.primary : 'none'};
  border-radius: ${(props): string =>
    props.selected ? '5px' : 'none'};
`

const FilterSection = (): JSX.Element => {
  const [selCardStatus, setSelCardStatus] = useRecoilState(
    atom.SelCardStatus
  )
  const cardListByStatus = useRecoilValue(atom.CardListByStatus)
  return (
    <Container>
      <FilterTitle>{'Card Status'}</FilterTitle>

      {_.map(CardStatusEnum, (status) => {
        return (
          <FilterItemText
            key={`FilterItemText${status}`}
            selected={status === selCardStatus}
            onClick={(): void => {
              setSelCardStatus(
                _.isEmpty(selCardStatus) || selCardStatus !== status
                  ? status
                  : undefined
              )
            }}
          >
            {status}
          </FilterItemText>
        )
      })}
      <hr />
      <div>
        {_.map(_.toArray(cardListByStatus), (card, index) => {
          return <Card key={index} card={card} />
        })}
      </div>
    </Container>
  )
}

export default FilterSection
