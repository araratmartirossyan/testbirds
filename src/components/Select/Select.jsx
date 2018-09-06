import React, { Component } from 'react'
import { isEmpty } from 'ramda'
import ClickOutside from 'react-click-outside'
import UserCard from '../UserCard'
import Text from '../Text'
import './Select.css'

const EMPTY_TEXT_HEADER = 'Team member not found.'
const EMPTY_TEXT_FOOTER = 'Maybe she/he is not yet in your team?'

export default class Select extends Component {
  state = {
    userList: [],
    filteredList: []
  }

  componentWillMount() {
    this.setState({
      userList: this.props.users
    })
  }

  handleChooseUser = () =>
    console.log()

  renderUserCard = (user, key) =>
    <UserCard
      mode='user'
      user={user}
      key={key}
      chooseUser={this.handleChooseUser}
    />

  handleSearch = ({ target: { value } }) => {
    const { userList } = this.state
    const updateValue = value.toLowerCase()
    const filteredList = userList.filter(
      ({ username }) =>
        username.toLowerCase().search(updateValue) !== -1
    )
    this.setState({
      filteredList,
      value
    })
  }

  renderEmptyBlock = () =>
    <div className='empty-block'>
      <Text
        color='green'
        size='20px'
      >
        {EMPTY_TEXT_HEADER}
      </Text>
      <Text
        color='black'
        size='13px'
      >
        {EMPTY_TEXT_FOOTER}
      </Text>
    </div>

  render() {
    const { filteredList, value } = this.state
    const { handleClickOutside } = this.props
    const isShowUserList = !isEmpty(filteredList) && value.length > 0
    return (
      <ClickOutside onClickOutside={handleClickOutside}>
        <div className='select'>
          <input
            className='select__input'
            onInput={this.handleSearch}
          />
          {isShowUserList && filteredList.map(this.renderUserCard)}
          {!isShowUserList && this.renderEmptyBlock()}
        </div>
      </ClickOutside>
    )
  }
}
