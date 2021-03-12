import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';
import App from './App';
import Uikit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
Uikit.use(Icons);

ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

