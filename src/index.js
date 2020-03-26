import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import { forbiddenWordsMiddleware } from "./middleware/index";
import rootReducer from "./reducers/index";

import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/plugin.css';
import './assets/css/style.css';

import {loadState} from './reducers/localstorage.js';


const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, persistedState, composeEnhancers(
  applyMiddleware(forbiddenWordsMiddleware, thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <App />
 </Provider>,
  document.getElementById('render-target') || document.getElementById('root')
);
