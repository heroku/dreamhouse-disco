import axios from 'axios'

export function fetchConfig() {
  return function(dispatch) {
    dispatch({ type: 'FETCH_CONFIG' })
    return axios.get('/config')
      .then((response) => {
        dispatch({ type: 'FETCH_CONFIG_FULFILLED', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_CONFIG_REJECTED', payload: err })
      })
  }
}
