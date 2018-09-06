import React, { Component } from 'react'
import Text from '../Text'
import './UserCard.css'

const DEFAULT_TEXT = 'Add team member to this test'

export default class UserCard extends Component {
  renderLeftSide = ({ picture, id }) =>
    <div className='usercard__left_user'>
      <div
        className='usercard__left-icon_user'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/${picture})`,
        }}
      />
      <div
        onClick={this.handleRemoveUser(id)}
        className='usercard__left-close'
      />
    </div>

  renderSelectCard = ({ picture }) =>
    <div className='usercard__left_select'>
      <div
        className='usercard__left-icon'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/${picture})`,
        }}
      />
    </div>
  

  renderRightSide = ({ username, role }) => {
    const existingRole = role === 'Admin' ? role : `${role} member`
    return (
      <div className='usercard__right'>
        <Text>
          {existingRole}
        </Text>
        <Text>
          {username}
        </Text>
      </div>
    )
  }
  renderDefaultText = text =>
    <div className='usercard__right'>
      <Text
        color='green'
        weight={600}
      >
        {text}
      </Text>
    </div>
  
  handleChooseUser = user => () =>
    this.props.chooseUser(user)
  
  handleRemoveUser = id => () =>
    this.props.handleRemoveUser(id)

  render() {
    const { user, mode, handleOpenSelect } = this.props
    const isUserMode = mode === 'user'
    const isDefaultMode = mode === 'default'
    const isSelectMode = mode === 'selectList'

    if (isDefaultMode) {
      return (
        <div
          className='usercard'
          onClick={handleOpenSelect}
        >
          <div className='usercard__left'>
            <div className='usercard__left-button' />
          </div>
          {this.renderDefaultText(DEFAULT_TEXT)}
        </div>
      )
    }

    if (isUserMode) {
      return (
        <div className='usercard'>
          {this.renderLeftSide(user)}
          {this.renderRightSide(user)}
        </div>
      )
    }

    if (isSelectMode) {
      return (
        <div className='usercard' onClick={this.handleChooseUser(user)}>
          {this.renderSelectCard(user)}
          {this.renderRightSide(user)}
        </div>
      )
    }

  }
}
