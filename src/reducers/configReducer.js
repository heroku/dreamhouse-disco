

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  config: {}
}, action) {
  switch (action.type) {
    case 'FETCH_CONFIG': {
      return {...state, fetching: true, fetched: false}
    }
    case 'FETCH_CONFIG_FULFILLED': {
      return {...state, fetching: false, fetched: true, config: action.payload}
    }
    case 'FETCH_PLAYLIST_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    default: {
      return state
    }
  }
}
