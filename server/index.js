const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer();
const morgan = require('morgan');
const uuid = require('uuid');

const app = express();

// { name: timeout, ... }
const timeouts = {};

// { token: name, ... }
const tokens = {};

const chat = {
  users: [ { name: 'test' } ],
  messages: [
    { type: 'chat', author: 'test', text: 'Example message', date: new Date().valueOf() },
  ]
};

const corsOptions = {
  origin: [ 'http://192.168.0.14:3000', 'http://localhost:3000' ],
  methods: 'GET,POST',
  optionsSuccessStatus: 200
};

function logout(username) {
  chat.users = chat.users.filter(user => user.name !== username);

  chat.messages.unshift({
    type: 'system/user-left',
    name: username,
    author: 'system',
    date: new Date().valueOf()
  });

  delete timeouts[username];
}

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', cors(corsOptions), function (req, res) {

  if (req.query) {
    const username = req.query.from;

    if (timeouts[username]) {
      clearTimeout(timeouts[username]);

      timeouts[username] = setTimeout(() => {
        logout(username);
      }, 15000);
    }
  }
  res.json(chat);
});

app.options('/login', cors(corsOptions));
app.options('/logout', cors(corsOptions));
app.options('/new-message', cors(corsOptions));

app.post('/login', upload.array(), cors(corsOptions), function(req, res) {
  const user = req.body.newUser;
  timeouts[user.name] = setTimeout(() => {
    logout(user.name);
  }, 15000);

  const token = uuid.v1();
  tokens[token] = user.name;

  chat.users.push(user);
  chat.messages.unshift(req.body.newMsg);

  res.json({ token });
});

app.post('/logout', upload.array(), cors(corsOptions), function(req, res) {
  const token = req.body.token;

  if (token && tokens[token]) {
    logout(tokens[token]);

    res.json({ status: 'ok' });
  } else {
    console.log('Bad request');
    res.json({ status: 'false' });
  }
});

app.post('/new-message', upload.array(), cors(corsOptions), function(req, res) {
  const token = req.body.token;
  const { type, text, date } = req.body.newMsg;

  if (token && tokens[token]) {
    const author = tokens[token];

    const newMessage = { type, text, date, author };

    chat.messages.unshift(newMessage);

    res.json({ status: 'ok' });
  } else {
    console.log('Bad request');
    res.json({ status: 'false' });
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
