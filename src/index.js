import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import './index.css';

fetch('http://192.168.0.14:8080/')
  .then(res => res.json())
  .then(({ users, messages }) => {
    ReactDOM.render(
      <Chat users={users} messages={messages} />,
      document.getElementById('root')
    );
  });

