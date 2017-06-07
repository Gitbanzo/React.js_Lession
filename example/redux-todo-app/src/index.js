import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import reducer from './reducers/Todo'

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));

registerServiceWorker();
