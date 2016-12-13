let _ = require('lodash')

import { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'

import { logout } from '../actions/accountActions'

function select(store, ownProps) {
  const redirectToLogin = '/'
  const account = store.account.account
  return {
    redirectToLogin,
    account
  }
}

class Logout extends Component {
  componentWillReceiveProps(nextProps) {
    const { replace, redirectToLogin, account } = nextProps
    const { account: previousAccount } = this.props

    if (!_.isEmpty(previousAccount) && _.isEmpty(account)) {
      replace(redirectToLogin)
    }
  }

  render() {
    this.props.logout()

    return null
  }
}

export default connect(select, { logout, replace: routerActions.replace })(Logout);
