import React, { useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import _ from 'lodash'

import AddColumn from './AddColumn'
import CardBoard from './CardBoard'
import data from '../../data'

import atom from '@atom'
import CardDetail from './CardDetail'

const Home = (): JSX.Element => {
  const [initComplete, setInitComplete] = useState(false)

  const setCardList = useSetRecoilState(atom.CardList)
  const setColumnList = useSetRecoilState(atom.ColumnList)
  const setColumnOrder = useSetRecoilState(atom.ColumnOrder)
  const setCardDetailId = useSetRecoilState(atom.CardDetailId)

  const cardDetail = useRecoilValue(atom.CardDetail)

  const _onHideCardDetail = (): void => {
    setCardDetailId('')
  }

  useEffect(() => {
    setColumnList(data.columnList)
    const sortedColumnOrder = _.map(
      _.sortBy(_.toArray(data.columnList), (x) => x.order),
      (x) => x.id
    )
    setColumnOrder(sortedColumnOrder)
    setCardList(data.cardList)
    setInitComplete(true)
  }, [])

  return (
    <Container fluid>
      {initComplete && (
        <>
          <AddColumn />
          <CardBoard />
        </>
      )}
      <Modal
        show={_.some(cardDetail)}
        onHide={_onHideCardDetail}
        size="lg"
      >
        {cardDetail && <CardDetail card={cardDetail} />}
      </Modal>
    </Container>
  )
}

export default Home
