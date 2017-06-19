let _ = require('lodash')

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, NoMatch } from 'react-router';
import { syncHistoryWithStore, routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './components/App';
import Music from './components/Music';
import Logout from './components/Logout';
import store from './store'



import './style.css';

const history = syncHistoryWithStore(hashHistory, store);

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: () => ({ referrer: document.referrer }),
  // authSelector: state => state.account.account,
  failureRedirectPath: '/',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: ({ referrer }) => {
    // console.log('REFERRER',referrer)
    // console.log('CURRENT HOSTNAME',`${document.location.protocol}//${document.location.host}`)
    return _.startsWith(referrer, `${document.location.protocol}//${document.location.host}`)
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}/>
      <Route path="/music" component={UserIsAuthenticated(Music)}/>
      <Route path="/logout" component={Logout}/>
      <Route path="*" component={NoMatch}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
