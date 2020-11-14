import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import { useSetRecoilState, useRecoilState } from 'recoil'

import atom from '@atom'
import ColumnModel from '@model/ColumnModel'
import { Alert, Colors } from '@constant'

const Con = styled.div`
  width: 220px;
  margin: 8px;
  padding: 8px;
  border: 1px solid ${Colors.line};
`

const InputColumnTitle = styled.input`
  width: 100%;
`

const Box = styled(Button)`
  width: 100%;
`

const AddColumn = (): JSX.Element => {
  const [inputTitle, setInputTitle] = useState('')

  const [columnList, setColumnList] = useRecoilState(atom.ColumnList)
  const setColumnOrder = useSetRecoilState(atom.ColumnOrder)

  const _onClick = (): void => {
    const title = inputTitle.trim()
    setInputTitle(title)
    if (_.isEmpty(title)) {
      Alert.alert({ message: 'Input column title. please :)' })
      return
    }
    if (_.some(columnList, (x) => x.title === title)) {
      Alert.alert({ message: `"${title}" is already exist` })
      return
    }

    const columnId = `column-${_.size(columnList) + 1}`
    const newColumn: ColumnModel = {
      id: columnId,
      title,
      order: _.size(columnList),
      issueIdList: [],
    }
    setColumnList((ori) => {
      return {
        ...ori,
        [columnId]: newColumn,
      }
    })
    setColumnOrder((ori) => {
      return ori.concat([columnId])
    })
  }

  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputTitle(value)
  }

  const _onKeyPress = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Enter') {
      _onClick()
    }
  }

  return (
    <Con>
      <InputColumnTitle
        placeholder={'Column Title'}
        value={inputTitle}
        onChange={_onChange}
        onKeyPress={_onKeyPress}
      />
      <Box onClick={_onClick}>+ Add Column</Box>
    </Con>
  )
}

export default AddColumn
