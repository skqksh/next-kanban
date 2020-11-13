import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import _ from 'lodash'

const Con = styled.div`
  width: 220px;
  margin: 8px;
  padding: 8px;
  border: 1px solid #888;
`

const InputColumnTitle = styled.input`
  width: 100%;
`

const Box = styled(Button)`
  width: 100%;
`

const AddColumn = ({
  addColumn,
}: {
  addColumn: ({ title }: { title: string }) => void
}): JSX.Element => {
  const [inputTitle, setInputTitle] = useState('')
  const _onClick = (): void => {
    if (_.isEmpty(inputTitle)) {
      alert('Please, input title')
      return
    }
    addColumn({ title: inputTitle })
  }
  return (
    <Con>
      <InputColumnTitle
        placeholder={'Column Title'}
        value={inputTitle}
        onChange={({ target: { value } }): void => {
          setInputTitle(value)
        }}
      />
      <Box onClick={_onClick}>+ Add Column</Box>
    </Con>
  )
}

export default AddColumn
