import axios from 'axios'

export function fetchConfig() {
  return function(dispatch) {
    dispatch({ type: 'FETCH_CONFIG' })
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      // Use the staging server if on localhost / running via create-react-app
      console.log('Detected localhost. Using staging server for Travolta...')
      dispatch({ type: 'FETCH_CONFIG_FULFILLED', payload: {apiUrl: `https://travolta-staging.herokuapp.com`}})
    } else {
      // Otherwise, use the server config
      return axios.get('/config')
        .then((response) => {
          dispatch({ type: 'FETCH_CONFIG_FULFILLED', payload: response.data })
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_CONFIG_REJECTED', payload: err })
        })
    }
  }
}
