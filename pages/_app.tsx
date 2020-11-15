import 'bootstrap/dist/css/bootstrap.css'
import App from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props
    return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    )
  }
}
export default MyApp
