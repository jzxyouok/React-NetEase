import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Wrap} from 'app/components'
import Home from './Home'
import Hot from './Hot'
import Me from './Me'

export default (props) => (
  <BrowserRouter>
    <Wrap>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/hot" component={Hot} />
        <Route path="/me" component={Me} />
      </Switch>
    </Wrap>
  </BrowserRouter>
)