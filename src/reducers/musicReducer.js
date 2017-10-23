const _ = require('lodash')

export default function reducer(state={
  music: {},
  currentTrack: null,
  currentTrackIndex: 0,
  newTrack: null,
  newTracks: [],
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

      // Determine tracks in newState that are not in state
      // i.e. determine new tracks added to playlist
      // FIXME: this does not handle the same track being added twice to the playlist
      //        maybe use composite key of track.id and music.snapshot_id ?
      const currentTracks = _.get(state, `music.tracks.items`, [])
      let tracksDiff = _.differenceBy(newState.music.tracks.items, currentTracks, "track.id")
      newState.newTracks = state.newTracks.concat(tracksDiff)

      // Determine what the currently playing track is -- i.e. the first track in the array
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

    case 'NEXT_NEW_TRACK': {
      const newTrack = _.first(state.newTracks)
      const newTracks = state.newTracks.slice(1)

      return {
        ...state,
        newTrack,
        newTracks
      }
    }

    default: {
      return state;
    }
  }
}
