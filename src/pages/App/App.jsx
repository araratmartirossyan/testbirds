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
    usersList: []
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

  updateList = usersList => {
    setItemToStorage('users', usersList)
    this.setState({ usersList })
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
    <div className="app__top">
      <Text uppercase>
        {headerText}
      </Text>
    </div>

  render() {
    const { users } = this.props
    const { isSelectOpen, usersList } = this.state

    return (
      <div className="app">
        <Wrapper>
          {this.renderHeader()}
          <div className="app__bottom">
            <UserCard
              mode='default'
              handleOpenSelect={this.openSelect}
            />
            {usersList.map(
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
        <div className='app__loadmore' onClick={this.props.loadMore}>
          Show All
        </div>
      </div>
    )
  }
}
