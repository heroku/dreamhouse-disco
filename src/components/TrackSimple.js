import React from 'react'
import AnimateHeight from 'react-animate-height'

class TrackSimple extends React.Component {

  constructor() {
    super()
    this.state = {display: false, animate: false, animateOut: false}
    this.registered = false
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentTrack && !this.registered) {
      this.registered = true
      this.setState({display: true, animate: true})
      this.animateTimeout = window.setTimeout(() => this.setState({animate: false}), 4000)
      this.animateOutTimeout = window.setTimeout(() => this.setState({animateOut: false}), 4500)
    }
  }

  handleClick () {
    if(this.state.display && (this.state.animate || this.state.animateOut)) {
      window.clearTimeout(this.animateOutTimeout)
      window.clearTimeout(this.animateTimeout)
      this.setState({animate: false, animateOut: false})
      this.props.dismissAnimation()
    } else {
      this.props.removeTrack(this.props.track)
    }
  }

  render() {
    const { track } = this.props
    return (
      <li onClick={() => this.handleClick()} className={`track track-simple ${this.state.display ? 'track-display' : ''} ${this.state.animate ? 'track-animate' : ''} ${this.state.animateOut ? 'track-animate-out' : ''}`} id={ track.key }>
        <div className='track-artwork-big'>
          <img src={ track.album.images[0].url } alt={ track.album.name }/>
        </div>
        <AnimateHeight duration={1000} height={this.state.display ? 'auto' : '0'}>
          <div className='track-content'>
            <img className='track-artwork' src={ track.album.images[0].url } alt={ track.album.name }/>
            <div className='track-details'>
              <span className='track-artist'>{ track.artists[0].name }</span>
              <span className='track-title'>{ track.name }</span>
            </div>
          </div>
        </AnimateHeight>
      </li>
    )
  }
}

export default TrackSimple
