import React from 'react'
import styled from 'styled-components'

import { Text } from '@component/Text'
import { Colors } from '@constant'

const StyledFooter = styled.footer`
  background-color: ${Colors.darkGrey};
  padding: 50px;
  margin-top: 20px;
`

const Footer = (): JSX.Element => (
  <StyledFooter>
    <Text
      style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}
    >
      NEXT-KANBAN &copy; Blue
    </Text>
  </StyledFooter>
)

export default Footer
