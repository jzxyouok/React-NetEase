import React from 'react'
import {Nav, Brand} from 'app/components'

export default class index extends React.Component {
  render() {
    return (
      <div>
        <Brand />
        <h1>我是首页</h1>
        <Nav />
      </div>
    )
  }
}
