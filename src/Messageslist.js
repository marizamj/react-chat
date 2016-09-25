import React, { Component } from 'react';
import { getTime } from './helpers';

const Message = ({ name, type, author, date, style, text }) => {
  const systemMessage = {
    'system/user-left':
      <span>
        User <strong>{ name }</strong> has left the chat
      </span>,

    'system/user-joined':
      <span>
        User <strong>{ name }</strong> has joined the chat
      </span>
  };

  return <div className="msg-list__item" style={style}>
    <span className="msg-text">
      {
        type.startsWith('system') ?
          <span className="msg-system">
            { systemMessage[type] }
          </span>
          :
          <span>{ text }</span>
      }
    </span>
    <span className="msg-author">[ {author} ]</span>
    <span className="msg-date">{getTime(date)}</span>
  </div>
}

class Messageslist extends Component {
  state = { height: `${window.innerHeight - 200}px` };

  handleResize = e => {
    this.setState({ height: `${window.innerHeight - 200}px` });
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const style = { height: this.state.height };
    return <div className="msg-list" style={ style }>
      {this.props.messages.map((msg, i) => {
        return <Message
          style={{ bottom: `${i * 30}px` }}
          {...msg}
          key={msg.date} />
        })
      }
    </div>
  }
}

export default Messageslist;
