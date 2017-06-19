import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';

var middleware = [promise(), thunk()];

if (process.env.DEBUG == 'true') {
  middleware.push(logger());
}

middleware.push(routerMiddleware(hashHistory));

export default createStore(reducer, applyMiddleware(middleware));
