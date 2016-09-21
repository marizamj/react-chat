import React, { Component } from 'react';

const User = ({ name, isStrong }) =>
  <li className="userlist__li">
    { isStrong ? <strong className="user--strong">{name}</strong> : <span>{name}</span> }
  </li>;

class Userlist extends Component {
  render() {
    return <div className="userlist">
      Users online:
      <ul className="userlist__ul">
        {this.props.users.map(user =>
          <User
            isStrong={user.name === this.props.currentName}
            name={user.name}
            key={user.name}
          />
        )}
      </ul>
    </div>
  }
}

export default Userlist;
