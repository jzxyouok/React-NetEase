import React from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom'

const Links = () => (
  <nav>
    <Link to="/?id=123">InLine</Link>
    <Link to={{pathname: '/', search: 'id=456'}}>Object</Link>
  </nav>
)

const App = (props) => (
  <BrowserRouter>
    <div>
      <Links />
      <Route
        path="/"
        render={({match, location}) => (
          <div>
            <p>root</p>
            <p>{JSON.stringify(match)}</p>
            <p>{JSON.stringify(location)}</p>
          </div>
        )}
      />
    </div>
  </BrowserRouter>
)

export default App