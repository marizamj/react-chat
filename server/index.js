const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer();
const morgan = require('morgan');

const app = express();

const timeouts = {};

const chat = {
  users: [ { name: 'test' } ],
  messages: [
    { type: 'chat', author: 'test', text: 'Example message', date: new Date().valueOf() },
  ]
};

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  optionsSuccessStatus: 200
};

function logout(username) {
  chat.users = chat.users.filter(user => user.name !== username);
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

  chat.users.push(user);
  chat.messages.unshift(req.body.newMsg);

  res.json({ status: 'ok' });
});

app.post('/logout', upload.array(), cors(corsOptions), function(req, res) {
  chat.users = req.body.users;

  res.json({ status: 'ok' });
});

app.post('/new-message', upload.array(), cors(corsOptions), function(req, res) {
  chat.messages.unshift(req.body.newMsg);

  res.json({ status: 'ok' });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
