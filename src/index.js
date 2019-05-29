import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import App from './components/App';
import './styles/main.scss';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ));

sagaMiddleware.run(rootSaga);


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

