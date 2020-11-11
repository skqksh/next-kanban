import React from 'react'
import styled from 'styled-components'

const Container = styled.nav`
  color: blue;
  padding: 16px;
  background-color: #eee;
  display: flex;
  justify-content: space-between;
`

const Header = (): JSX.Element => <Container>Home</Container>

export default Header
