// React
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import ReduxStore from "./store/index";

import injectTapEventPlugin from 'react-tap-event-plugin';
//React Modules
import App from './components/App.react';
// Libraries
import SetClientEnvironment from './library/SetClientEnvironment';
import events from "events";
events.EventEmitter.defaultMaxListeners = 100;

injectTapEventPlugin();

SetClientEnvironment();

ReactDOM.render((<Provider store={ReduxStore}>
  <App/>
</Provider>), document.getElementById('pageToRender'));
