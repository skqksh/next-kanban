import React from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import * as homeJson from '../../../asset/home.json'

import { Text } from '@component/Text'

const Container = styled.nav`
  padding: 16px;
  background-color: #eee;
  display: flex;
  justify-content: flex-start;
`

const Header = (): JSX.Element => (
  <Container>
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        // @ts-ignore
        animationData: homeJson.default,
      }}
      height={60}
      width={60}
      style={{ margin: 0 }}
    />
    <Text
      style={{ fontSize: 30, fontWeight: 'bold', padding: 5 }}
    >{`Blue's Kanban Board`}</Text>
  </Container>
)

export default Header
