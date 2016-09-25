import React, { Component } from 'react';
import { getTime } from './helpers';

const Message = props => {
  return <div className="msg-list__item" style={props.style}>
    <span className="msg-text">
      {
        props.type.startsWith('system') ?
          <span className="msg-system">
            User <strong>{ props.name }</strong> has { props.type.match(/\w+\/\w+-(.+)/)[1] } the chat
          </span>
          :
          <span>{ props.text }</span>
      }
    </span>
    <span className="msg-author">[ {props.author} ]</span>
    <span className="msg-date">{getTime(props.date)}</span>
  </div>
}

class Messageslist extends Component {
  constructor(props) {
    super(props);

    this.state = { height: `${window.innerHeight - 200}px` };

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    this.setState({ height: `${window.innerHeight - 200}px` });
  }

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
