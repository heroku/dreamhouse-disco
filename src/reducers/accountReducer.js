export default function reducer(state={
  account: JSON.parse(localStorage.getItem('account')) || {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    // ACCOUNT INFO
    case 'FETCH_ACCOUNT': {
      return {...state, fetching: true, fetched: false}
    }
    case 'FETCH_ACCOUNT_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_ACCOUNT_FULFILLED': {
      return {...state, fetching: false, fetched: true, account: action.payload}
    }

    // LOGIN
    case 'ACCOUNT_LOGGED_IN': {
      return {...state, account: action.payload}
    }

    // LOGOUT
    case 'LOGOUT_FULFILLED': {
      return {...state, fetched: false, account: {}}
    }
    case 'LOGOUT_REJECTED': {
      return state
    }

    // DEFAULT
    default: {
      return state;
    }
  }
}
