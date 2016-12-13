import axios from 'axios';

export function fetchPlaylist() {
  return function(dispatch) {
    const playlistUrl = 'http://localhost:3001/api/spotify_playlist'
    dispatch({type: 'FETCH_PLAYLIST'})
    return axios.get(playlistUrl)
      .then((response) => {
        dispatch({type: 'FETCH_PLAYLIST_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_PLAYLIST_REJECTED', payload: err})
      })
  }
}

export function nextTrack() {
  return {
    type: 'NEXT_TRACK'
  }
}

export function togglePlay() {
  return {
    type: 'TOGGLE_PLAY'
  }
}
