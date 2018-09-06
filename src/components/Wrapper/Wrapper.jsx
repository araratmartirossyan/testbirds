import React, { Component } from 'react'
import './Wrapper.css'

export default class Wrapper extends Component {
  render() {
    return (
      <div className='wrapper'>
        {this.props.children}
      </div>
    )
  }
}

Wrapper.propTypes = {
}

Wrapper.defaultProps = {
}
