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

  return {
    account,
    music,
    config
  }
}

class Demand extends Component {
  constructor(props) {
    super(props)
    this.displayNumber = false
    this.onKeyDown = this.handleKeyDown.bind(this)

    // get config
    props.fetchConfig()
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown)

    this.timeout = setInterval(() => this.handleDisplayNumber(), 10000)
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
    clearInterval(this.timeout)
  }
  
  handleDisplayNumber() {
    this.displayNumber = true
    setTimeout(() => this.displayNumber = false, 5000)
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
          <div className='playlist demand'>
            <ol className='tracks'>
              { tracks }
            </ol>
            <footer>
              <div className='track-count'><span>{ (tracks && tracks.length) || 0 }</span> tracks</div>
              <div className='request-track'>
                <div className='sms-number'>
                  <span>Text a track to </span>
                  <strong>{ phone_number || '(---) --- ---' }</strong>
                </div>
              </div>
            </footer>
          </div>
        </div>
      <div className={`big-number demand ${this.displayNumber ? 'display-big-number' : ''}`}>
          <span>Text a track to </span>
          <strong>{ phone_number || '(---) --- ---' }</strong>
        </div>
      </div>
    )
  }
}

export default connect(select, { fetchPlaylist, nextTrack, togglePlay, fetchAccount, fetchConfig })(Demand);
