import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' };

    this.send = this.send.bind(this);
  }

  send() {
    const { text } = this.state;

    if (text) {
      this.props.onClick(text);
      this.setState({ text: '' });
    }
  }

  render() {
    return <div className="new-msg">
      <textarea
        ref="textarea"
        autoFocus
        className="msg-input"
        placeholder="Type your message here.."
        onChange={ (e) => this.setState({ text: this.refs.textarea.value }) }
        onKeyDown={(e) => {
          if(e.keyCode === 13) {
            e.preventDefault();
            this.send();
          }
        }}
        value={ this.state.text }
      >
      </textarea>
      <span className="msg-send" onClick={this.send}>Send</span>
    </div>
  }
}

export default MessageInput;
