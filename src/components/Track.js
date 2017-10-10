import React from 'react'

class Track extends React.Component {

  leftPad(num) {
    return num < 10  ?  `0${num}`  :  `${num}`
  }

  formatDuration(durationMillis) {
    let duration = durationMillis / 1000
    return `${Math.floor(duration/60)}:${this.leftPad(Math.round(duration%60))}`
  }

  render() {
    const { track } = this.props
   // console.log(track.name, upNow, upNext)
    return (
      <li className='track' id={ track.key }>
        <span className='track-artwork'>
          <img src={ track.album.images[0].url } alt={ track.album.name }/>
        </span>
        <span className='track-title'>{ track.name }</span>
        <span className='track-artist'>{ track.artists[0].name }</span>
        <span className='track-time'>{ this.formatDuration(track.duration_ms) }</span>
      </li>
    )
  }
}

export default Track
