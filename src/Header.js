import React, { Component } from 'react';

class Header extends Component {
  render() {
    return this.props.name ?
      <div className="header">
        <div className="header-logo">Chyatik</div>
        <div className="header-username">Hello, {this.props.name}</div>
        <div className="header-exit">Exit</div>
      </div>
      :
      <div className="header-login">
        <form className="login-form">
          <label>What's your name?</label>
          <input type="text" className="login-input" ref="input" />
          <button className="login-btn" onClick={ (e) => {
            e.preventDefault();
            const value = this.refs.input.value;
            this.props.onClick(value);
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
