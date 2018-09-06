import React, { Component } from 'react'
import './Select.css'

export default class UserCard extends Component {
  state = {
    userList: []
  }

  componentWillMount = () =>
    this.setState({
      userList: this.props.users
    })

  renderUserCard = (user, key) => console.log(user, key)

  render() {
    return (
      <div className="select">
        <input />
        {userList.map(this.renderUserCard)}
      </div>
    )
  }
}
