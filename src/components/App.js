let _ = require('lodash')

import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux';

import logo from '../../images/disco-chat-logo.png'

import { fetchConfig } from '../actions/configActions'

function select(store, ownProps) {
  const config = store.config
  const redirect = '/music'
  const isAuthenticated = _.startsWith(ownProps.authData,
          `${document.location.protocol}//${document.location.host}`)

  return {
    config,
    isAuthenticated,
    redirect
  }
}


class App extends Component {
  constructor(props) {
    super(props)

    // get config
    props.fetchConfig()
  }
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
          { this.props.config.fetched &&
            <a href={ `${this.props.config.config.apiUrl}/auth/spotify?origin=${document.location.origin}/#/music` }
               className='button'>
              Get started!
            </a>
          }
        </div>
      </div>
    )
  }
}

export default connect(select, { replace: routerActions.replace, fetchConfig })(App)
