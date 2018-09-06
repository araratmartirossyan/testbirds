import React, { Component } from 'react'
import Wrapper from '../../components/Wrapper'
import Text from '../../components/Text'
import UserCard from '../../components/UserCard'
import Select from '../../components/Select'
import './App.css'

const headerText = 'Your team for this test'

export default class App extends Component {

  renderUser = (user = {}, key, mode) =>
    <UserCard
      key={key}
      user={user}
      mode='user'
    />

  renderHeader = () =>
    <div className="app__top">
      <Text uppercase>
        {headerText}
      </Text>
    </div>

  render() {
    const { users } = this.props
    return (
      <div className="app">
        <Wrapper>
          {this.renderHeader()}
          <div className="app__bottom">
            <UserCard mode='default' />
            {users.map(
              (user, key) =>
                this.renderUser(user, key)
            )}
          </div>
          {isSelectOpen && <Select users={users} />}
        </Wrapper>
      </div>
    )
  }
}
