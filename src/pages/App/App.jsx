import React, { Component } from 'react'
import { reject } from 'ramda'
import Wrapper from '../../components/Wrapper'
import Text from '../../components/Text'
import UserCard from '../../components/UserCard'
import Select from '../../components/Select'
import { setItemToStorage, getItemFromStorage } from '../../utils/clientStorage'

import './App.css'
const headerText = 'Your team for this test'

export default class App extends Component {
  state = {
    isSelectOpen: false,
    usersList: [],
    limit: 5
  }

  componentWillMount() {
    const usersList = getItemFromStorage('users')
    this.setState({
      usersList
    })
  }

  openSelect = () =>
    this.setState({
      isSelectOpen: !this.state.isSelectOpen
    })
  
  showMore = () =>
    this.setState({
      limit: this.state.limit + 5
    })

  updateList = usersList => {
    setItemToStorage('users', usersList)
    this.setState({
      usersList
    })
  }

  putUser = user => {
    const { usersList } = this.state
    this.updateList([...usersList, user])
  }

  removeUser = id => {
    const { usersList } = this.state
    const updatedList = reject(item => item.id === id, usersList)
    this.updateList(updatedList)
  }

  renderUser = (user = {}, key) =>
    <UserCard
      key={key}
      user={user}
      mode='user'
      handleRemoveUser={this.removeUser}
    />

  renderHeader = () =>
    <div className='app__top'>
      <Text uppercase>
        {headerText}
      </Text>
      <div className='app__top-right'>
        <span className='app__top-right_text'>Team Page</span>
        <img
          className='app__top-icon'
          src={`${process.env.PUBLIC_URL}/users-solid.svg`}
          alt='head'
        />
      </div>
    </div>

  render() {
    const { users } = this.props
    const { isSelectOpen, usersList, limit } = this.state
    const isShowMore = usersList.length >= limit && limit < users.length

    return (
      <div className='app'>
        <Wrapper>
          {this.renderHeader()}
          <div className='app__bottom'>
            <UserCard
              mode='default'
              handleOpenSelect={this.openSelect}
            />
            {usersList.slice(0, limit).map(
              (user, key) =>
                this.renderUser(user, key)
            )}
            {isSelectOpen && <Select
              handleClickOutside={this.openSelect}
              users={users}
              handlePutUser={this.putUser}
            />}
          </div>
        </Wrapper>
        {isShowMore && <div
          className='app__loadmore'
          onClick={this.showMore}
        >
          Show All
        </div>}
      </div>
    )
  }
}
