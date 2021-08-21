import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Provider } from "react-redux";
import store from './store/store'
import {history} from "./utils/helpers";
import App from './App';

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
