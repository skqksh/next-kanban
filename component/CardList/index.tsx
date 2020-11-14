import React from 'react'
import _ from 'lodash'

import Card from '../Card'
import CardModel from '@model/CardModel'

const CardList = React.memo(
  ({ cardList }: { cardList: CardModel[] }): JSX.Element => {
    return (
      <>
        {_.map(cardList, (card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </>
    )
  },
  (prevProps, nextProps) => nextProps.cardList === prevProps.cardList
)

export default CardList
