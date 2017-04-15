import './styles/normalize.scss'
import './styles/app.scss'
import './styles/font.scss'
import './styles/antdStyleReset.scss'
import './styles/plugin.scss'

import {AppContainer as HotReloader} from 'react-hot-loader'
import React from 'react'
import {render} from 'react-dom'
import {default as App} from './js/containers/App'
import RedBox from 'redbox-react'

if (process.env.NODE_ENV === 'development') {
  const renderRoot = () => render(
    <HotReloader errorReporter={RedBox}>
      <App />
    </HotReloader>,
    document.getElementById('root')
  );
  renderRoot();
  if (module.hot) {module.hot.accept('./js/containers/App', renderRoot);}
} else {
  render(<App />, document.getElementById('root'));
}


