import React, { Component } from 'react';

import { isNameValid, isRepeat } from './helpers';

class Header extends Component {
  state = { hint: 'hide', error: '' };

  setError = text => {
    this.setState({ hint: 'hide' });
    setTimeout(() => {
      this.setState({
        hint: 'show',
        error: text
      });
    }, 50);
  };

  componentDidMount() {
    window.onbeforeunload = (e) => {
      this.props.logout();
    }
  }

  render() {
    return this.props.name ?
      <div className="header">
        <div className="header-logo">Chyatik</div>
        <div className="header-username">Hello, {this.props.name}</div>
        <div className="header-exit">
          <span className="exit-btn" onClick={ e => {
            this.props.logout();
          } }>Exit</span>
        </div>
      </div>
      :
      <div className="header-login">
        <form className="login-form">
          <label>What's your name?</label>
          <input type="text" className="login-input" ref="input" maxLength="15" autoFocus />
          <span className={ this.state.hint === 'show' ? "login-hint visible" : "login-hint" } ref="hint">
           { this.state.error }
          </span>
          <button className="login-btn" onClick={ e => {
            e.preventDefault();
            const value = this.refs.input.value;
            if (isNameValid(value) && !isRepeat(value, this.props.users)) {
              this.props.login(value);
            } else if (isRepeat(value, this.props.users)) {
              this.setError(`User ${value} is already in the chat.`);
            } else {
              this.setError('Name should contain only letters, numbers and symbols "-", "_".');
            }
          } }>Enter</button>
          <div className="error">
          { this.props.error ? this.props.error.text : `` }
          </div>
        </form>
      </div>
  }
}

window.Header = Header;

export default Header;
