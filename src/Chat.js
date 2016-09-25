import React, { Component } from 'react';

import Header from './Header';
import Userlist from './Userlist';
import Messageslist from './Messageslist';
import MessageInput from './MessageInput';

class Chat extends Component {
  constructor(props) {
    super(props);
    const { users, messages } = props;
    this.state = { users, messages };
  }

  updateChat = () => {
    fetch(`http://localhost:8080/?from=${this.state.name}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ ...json });
      });
  };

  componentDidMount() {
    this.interval = setInterval(this.updateChat, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { name, users, messages } = this.state;

    if (!name) {
      return <Header
        users={users}
        login={ name => {
          const newMsg = {
            type: 'system/user-joined',
            name: name,
            author: 'system',
            date: new Date().valueOf()
          };

          this.setState({
            name,
            users: [ ...users, { name } ],
            messages: [ newMsg, ...messages ]
          });

          fetch('http://localhost:8080/login', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ newUser: { name }, newMsg })
          });
      } } />
    }

    return (
      <div>
        <Header
          name={name}
          logout={ () => {
            fetch('http://localhost:8080/logout', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({ name })
            });

            this.setState({ name: '' });
          } }
        />
        <Userlist users={users} currentName={name} />
        <Messageslist messages={messages} />
        <MessageInput onClick={(text) => {
            const newMsg = {
              type: 'chat',
              text,
              author: name,
              date: new Date().valueOf()
            };
            this.setState({ messages: [ newMsg, ...messages ] });

            fetch('http://localhost:8080/new-message', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({ newMsg })
            });
          }}
        />
      </div>
    );
  }
}

export default Chat;
