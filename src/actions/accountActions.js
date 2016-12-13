import axios from 'axios'

export function login(data) {
  localStorage.setItem('account', JSON.stringify(data))

  return {
    type: 'ACCOUNT_LOGGED_IN',
    payload: data
  }
}

export function fetchAccount(accountUrl) {
  return function(dispatch) {
    dispatch({type: 'FETCH_ACCOUNT'})
    return axios.get(accountUrl)
      .then((response) => {
        dispatch({type: 'FETCH_ACCOUNT_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_ACCOUNT_REJECTED', payload: err})
      })
  }
}

export function logout() {
  localStorage.removeItem('account')

  return function(dispatch) {
    dispatch({type: 'BEGIN_LOGOUT'})
    return axios.get('/api/auth/logout')
      .then((response) => {
        dispatch({type: 'LOGOUT_FULFILLED'})
      })
      .catch((err) => {
        dispatch({type: 'LOGOUT_REJECTED', payload: err})
      })
  }
}
