import React, { Component } from 'react'
import Text from '../Text'
import './UserCard.css'

const DEFAULT_TEXT = 'Add team member to this test'

export default class UserCard extends Component {
  renderLeftSide = ({ picture }) =>
    <div className="usercard__left">
      <div
        className="usercard__left-icon"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/${picture})`,
        }}
      >
        
      </div>
    </div>

  renderRightSide = ({ username }) =>
    <div className="usercard__right">
      <Text>
        {username}
      </Text>
    </div>

  renderDefaultText = text =>
    <div className="usercard__right">
      <Text
        color='green'
        weight={600}
      >
        {text}
      </Text>
    </div>


  render() {
    const { user, mode } = this.props
    const isUserMode = mode === 'user'
    const isDefaultMode = mode === 'default'

    if (isDefaultMode) {
      return (
        <div className="usercard">
          <div className="usercard__left">
            <div className="usercard__left-button" />
          </div>
          {this.renderDefaultText(DEFAULT_TEXT)}
        </div>
      )
    }

    if (isUserMode) {
      return (
        <div className="usercard">
          {this.renderLeftSide(user)}
          {this.renderRightSide(user)}
        </div>
      )
    }

  }
}
