import React from 'react'
import styled from 'styled-components'
import { Colors } from '@constant'

const StyledText = styled.div`
  color: ${Colors.text};
`

export const Text = (
  props: React.DOMAttributes<HTMLDivElement>
): JSX.Element => {
  return <StyledText {...props} />
}
