const _ = require('lodash')

export default function reducer(state={
  music: {},
  currentTrack: null,
  currentTrackIndex: 0,
  playing: true,
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_PLAYLIST': {
      return {...state, fetching: true}
    }

    case 'FETCH_PLAYLIST_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }

    case 'FETCH_PLAYLIST_FULFILLED': {
      let newState = {
        ...state,
        fetching: false,
        fetched: true,
        music: action.payload
      }

      let currentTrack = _.get(action, `payload.tracks.items[${state.currentTrackIndex}].track.preview_url`)
      if (currentTrack) {
        newState.currentTrack = currentTrack.slice(0)
      }
      return newState
    }

    case 'NEXT_TRACK': {
      let newState = {...state}
      let tracks = state.music.tracks.items
      if (state.currentTrackIndex < tracks.length-1) {
        newState.currentTrackIndex++
        newState.currentTrack = tracks[newState.currentTrackIndex].track.preview_url.slice(0)
      } else {
        newState.playing = false
      }
      return newState
    }

    case 'TOGGLE_PLAY': {
      return {...state, playing: !state.playing }
    }

    default: {
      return state;
    }
  }
}
