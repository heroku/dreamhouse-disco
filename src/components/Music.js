import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

import Track from './Track';

import logo from '../../images/disco-chat-logo.png'

import { fetchPlaylist, nextTrack, togglePlay } from '../actions/musicActions'
import { fetchAccount } from '../actions/accountActions'
import { fetchConfig } from '../actions/configActions'

const select = function(store, ownProps) {
  const { account, music, config } = store
  // if (_.isEmpty(music.music)) {
  //   music.music.tracks = {}
  //   music.music.tracks.items = []
  // }
  return {
    account,
    music,
    config
  }
}


class Music extends Component {
  constructor(props) {
    super(props)
    this.onKeyDown = this.handleKeyDown.bind(this)

    // get config
    props.fetchConfig()
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.config.fetching && nextProps.config.fetched) {
      // console.log(this.props.config.config.apiUrl)
      // Fetch user info
      const accountUrl = `${nextProps.config.config.apiUrl}/api/disco_registration`
      this.props.fetchAccount(accountUrl)

      // Fetch playlist
      const playlistUrl = `${nextProps.config.config.apiUrl}/api/spotify_playlist`
      this.props.fetchPlaylist(playlistUrl)
      this.playlistFetchTimer = setInterval(() => this.props.fetchPlaylist(playlistUrl), 5000)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyDown)

    // Stop timer that triggers continuous playlist re-fetch
    clearInterval(this.playlistFetchTimer)
  }

  handleKeyDown(e) {

    switch (e.keyCode) {
      case 32: { // space
        this.props.togglePlay()
        e.preventDefault()
        break
      }
      case 39: { // right arrow
        this.props.nextTrack()
        e.preventDefault()
        break
      }
      default: {
      }
    }
  }

  render() {
    let phone_number, room_name, salesforce_org
    if (this.props.account.fetched) {
      ({ phone_number, room_name, salesforce_org } = this.props.account.account)
    }

    let trackItems, currentTrackIndex, upNextTrack, nowPlayingTrack, tracks
    if (this.props.music.fetched) {
      trackItems = this.props.music.music.tracks.items
      currentTrackIndex = this.props.music.currentTrackIndex
      upNextTrack = trackItems.length > currentTrackIndex + 1 ? trackItems[currentTrackIndex + 1] : null
      nowPlayingTrack = trackItems.length > currentTrackIndex ? trackItems[currentTrackIndex] : null

      tracks = _.map(trackItems.slice(currentTrackIndex + 2), (track) => {
        return <Track
          key={ track.track.id + track.added_at }
          track={ track.track }
          />
      }).reverse()
    }

    let isPlaying = this.props.music.playing
    let playingClass = isPlaying ? 'playing' : 'paused'
    let playingText  = isPlaying ? 'Now Playing' : 'Paused'


    return (
      <div className='main demo' onKeyDown={ this.handleKeyDown }>

        <header>
          <a href='#' className='logo'>
            <img src={ logo } alt='Smiley face'/>
            <h1>Dreamhouse<strong>Disco</strong></h1>
          </a>
          <div id="audio-player">
            <ReactPlayer
              url={ this.props.music.currentTrack }
              playing={ isPlaying }
              controls={ false }
              height={ 0 }
              width={ 0 }
              onEnded={ () => this.props.nextTrack() }
            />
        </div>
          <p className='byline'>a demo app running on <a href='https://www.heroku.com/' className='logo-heroku'>Heroku</a></p>
        </header>

        <div className='playlist-container'>
          <div className='player'>
            <div className='container'>
              { nowPlayingTrack &&
                <div>
                  {/* Could we swap out the h2 content to reflect the track status?
                      It could swap between "Now Playing" and "Paused"
                   */}
                  <h2>{ playingText }</h2>
                 {/* For below: Add className of 'playing' or 'paused' */}
                  <div className={ `track now-playing ${playingClass}` }>
                    <div id="track-controls">
                      <img src={ nowPlayingTrack.track.album.images[0].url } alt={ nowPlayingTrack.track.album.name }/>
                      <a className="track-play" onClick={ () => this.props.togglePlay() }>Play</a>
                      <a className="track-pause" onClick={ () => this.props.togglePlay() }>Pause</a>
                      <a className="track-next" onClick={ () => this.props.nextTrack() }>Next</a>
                    </div>
                    <span className='track-title'>{ nowPlayingTrack.track.name }</span>
                    <span className='track-artist'>{ nowPlayingTrack.track.artists[0].name }</span>
                    <svg id="now-playing-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><style>{ `.st0{fill:#048EC6;}.st1{fill:none;stroke:#FFFFFF;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}` }</style><circle className="st0" cx="25" cy="25" r="25"/><polygon className="st1" points="11.9,19.1 11.9,31.4 19.3,31.4 26,38.1 26,11.9 19.5,19.2 "/><path id="audio-inner" className="st1" d="M29.7,21.2c2.2,0,4,1.8,4,4s-1.8,4-4,4"/><path id="audio-outer" className="st1" d="M31.7,17c3.7,0.9,6.4,4.2,6.4,8.2s-2.7,7.3-6.4,8.2"/></svg>
                  </div>
                </div>
              }
              { upNextTrack &&
                <div>
                  <h2>Up next</h2>
                  <div className='track on-deck'>
                    <img src={ upNextTrack.track.album.images[0].url } alt={ upNextTrack.track.album.name }/>
                    <span className='track-title'>{ upNextTrack.track.name }</span>
                    <span className='track-artist'>{ upNextTrack.track.artists[0].name }</span>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='playlist'>
            <ol className='tracks'>
              { tracks }
            </ol>
            <footer>
              <div className='track-count'><span>{ (tracks && tracks.length) || 0 }</span> tracks</div>
              <div className='request-track'>
                <div className='sms-number'>
                  <span>text a track to </span>
                  <strong>{ phone_number || '(---) --- ---' }</strong>
                </div>
                <div className='fb-bot'>
                  <p>request a track via <a target='_blank' href='https://www.facebook.com/dreamhousedisco'>fb.me/dreamhousedisco</a></p>
                  <small>You are in the <strong>{ (room_name && room_name.toUpperCase()) || '---------' }</strong></small>
                </div>
                <div className='chatter-bot'>
                  <p>request a track via <a target='_blank' href={ salesforce_org && 'https://' + salesforce_org + '-dev-ed.lightning.force.com' }>chatter on salesforce.com</a></p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(select, { fetchPlaylist, nextTrack, togglePlay, fetchAccount, fetchConfig })(Music);
