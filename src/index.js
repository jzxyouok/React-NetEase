import './styles/normalize.scss'
import './styles/app.scss'
import './styles/font.scss'

import {AppContainer as HotReloader} from 'react-hot-loader'
import React from 'react'
import {render} from 'react-dom'
import {default as App} from './js/containers/App'
import Redbox from 'redbox-react'

const renderRoot = () => render(
  <HotReloader errorReporter={Redbox}>
    <App />
  </HotReloader>,
  document.getElementById('root')
);

renderRoot();

//---Hot Module Replacement
if (module.hot) {module.hot.accept('./js/containers/App', renderRoot);}