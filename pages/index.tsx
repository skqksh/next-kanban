import React from 'react'

import Layout from '../component/Layout'
import Home from './Home'

const IndexPage = (): JSX.Element => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Home />
    </Layout>
  )
}
export default IndexPage
