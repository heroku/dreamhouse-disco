import React from 'react'

class TrackSimple extends React.Component {

  render() {
    const { track } = this.props
    return (
      <li onClick={() => this.props.removeTrack(track)} className='track track-simple' id={ track.key }>
        <div className='track-artwork-big'>
          <img src={ track.album.images[0].url } alt={ track.album.name }/>
        </div>
        <img className='track-artwork' src={ track.album.images[0].url } alt={ track.album.name }/>
        <div className='track-details'>
          <span className='track-artist'>{ track.artists[0].name }</span>
          <span className='track-title'>{ track.name }</span>
        </div>
      </li>
    )
  }
}

export default TrackSimple
