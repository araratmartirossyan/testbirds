import React, { Component } from 'react'
import { isEmpty, difference } from 'ramda'
import ClickOutside from 'react-click-outside'
import { getItemFromStorage } from '../../utils/clientStorage'
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
    this.updateUsersList()
  }

  updateUsersList = () => {
    const { users } = this.props
    const existingList = getItemFromStorage('users')
    this.setState({
      userList: difference(users, existingList),
    })
  }

  handleChooseUser = user => {
    this.props.handlePutUser(user)
    this.props.handleClickOutside()
    this.updateUsersList()
  }

  renderUserCard = (user, key) =>
    <UserCard
      mode='selectList'
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
    const isShowUserList = !isEmpty(filteredList)
    return (
      <ClickOutside onClickOutside={handleClickOutside}>
        <div className='select'>
          <div className='input__wrapper'>
            <input
              className='select__input'
              onInput={this.handleSearch}
            />
          </div>
          {isShowUserList && filteredList.map(this.renderUserCard)}
          {!isShowUserList && this.renderEmptyBlock()}
        </div>
      </ClickOutside>
    )
  }
}
