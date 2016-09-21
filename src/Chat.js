import React, { Component } from 'react';

import Header from './Header';
import Userlist from './Userlist';
import Messageslist from './Messageslist';
import MessageInput from './MessageInput';


const db = {
  error: null,
  name: '',
  users: [ { name: 'User1' }, { name: 'User2' } ],
  messages: [
    { type: 'chat', author: 'User1', text: 'Vsem privki', date: new Date() },
   ]
}



// function checkName(name, users) {
//   if (!name.match(/^[!@#\$%\^\&*._-]{10,}$/g)) {
//     return {
//       valid: false,
//       error: { text: `Name can only contain letters, numbers or ! @ # $ % ^ & * . - _ and it should be 10 symbols or less.` }
//     };
//   }

//   const isSameUser = users.find(user => user.name === name);

//   return isSameUser ?
//     { valid: false, error: { text: `Someone already uses this name. Try another.` }}
//     :
//     { valid: true, error: null };
// }

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = db;
  }

  render() {
    const { name, users, messages, error } = this.state;

    if (!name) {
      return <Header error={error} onClick={ (name) => {
        this.setState({
          name,
          users: [ ...users, { name } ],
          messages: [ {
            type: 'system/user-joined',
            name: name,
            author: 'system',
            date: new Date()
          }, ...messages
        ]})

      } } />
    }

    return (
      <div>
        <Header name={name} />
        <Userlist users={users} currentName={name} />
        <Messageslist messages={messages} />
        <MessageInput onClick={(text) => {
            const newMsg = {
              type: 'chat',
              text,
              author: name,
              date: new Date()
            };
            this.setState({ messages: [ newMsg, ...messages ] });
          }}
        />
      </div>
    );
  }
}

export default Chat;
