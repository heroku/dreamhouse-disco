import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';

const middleware = applyMiddleware(
    promise(),
    thunk,
    routerMiddleware(hashHistory)
  );

export default createStore(reducer, middleware);
