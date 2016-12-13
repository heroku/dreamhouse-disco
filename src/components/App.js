let _ = require('lodash')

import React, { Component } from 'react';
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux';

import logo from '../../images/disco-chat-logo.png';

function select(store, ownProps) {
  const redirect = '/music'
  const authUrl = 'http://localhost:3001/api/auth'
  const isAuthenticated = _.startsWith(ownProps.authData,
          `${document.location.protocol}//${document.location.host}`)

  return {
    isAuthenticated,
    redirect,
    authUrl
  };
}


class App extends Component {
  componentWillMount() {
    const { isAuthenticated, replace, redirect } = this.props

    if (isAuthenticated) {
      replace(redirect)
    }
  }

  render() {
    return (
      <div className='main login'>
        <div className='login-container'>
          <div className='logo'>
            <img src={ logo } alt='Smiley face'/>
            <h1>Dreamhouse<strong>Disco</strong></h1>
          </div>
          <p className='tagline'>Your Party Built this Playlist</p>
          <a href={ this.props.authUrl } className='button'>Get started!</a>
        </div>
      </div>
    )
  }
}

export default connect(select, { replace: routerActions.replace })(App)
