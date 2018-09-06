import React, { Component } from 'react'
import { isEmpty, difference } from 'ramda'
import ClickOutside from 'react-click-outside'
import { getItemFromStorage } from '../../utils/clientStorage'
import UserCard from '../UserCard'
import Text from '../Text'
import './Select.css'

const EMPTY_TEXT_HEADER = 'Team member not found.'
const EMPTY_TEXT_FOOTER = 'Maybe she/he is not yet in your'

export default class Select extends Component {
  state = {
    userList: [],
    filteredList: []
  }

  componentWillMount() {
    const { users } = this.props
    const existingList = getItemFromStorage('users')
    this.setState({
      filteredList: difference(users, existingList),
      userList: difference(users, existingList)
    })
  }

  updateUsersList = () => {
    const { users } = this.props
    const existingList = getItemFromStorage('users')
    this.setState({
      userList: difference(users, existingList),
      filteredList: difference(users, existingList)
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
    if (isEmpty(value)) this.updateUsersList()
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
        {EMPTY_TEXT_FOOTER} <span className='empty-block_red'>team?</span>
      </Text>
    </div>

  render() {
    const { filteredList } = this.state
    const { handleClickOutside } = this.props
    const isEmptyBlockAppear = isEmpty(filteredList)

    return (
      <ClickOutside onClickOutside={handleClickOutside}>
        <div className='select'>
          <div className='input__wrapper'>
            <input
              className='select__input'
              onInput={this.handleSearch}
            />
          </div>
          {filteredList.map(this.renderUserCard)}
          {isEmptyBlockAppear && this.renderEmptyBlock()}
        </div>
      </ClickOutside>
    )
  }
}
