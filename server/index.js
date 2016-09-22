const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer();
const morgan = require('morgan');

const app = express();

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

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', cors(corsOptions), function (req, res) {
  res.send(chat);
});

app.options('/login', cors(corsOptions));
app.options('/new-message', cors(corsOptions));

app.post('/login', upload.array(), cors(corsOptions), function(req, res) {
  chat.users.push(req.body.newUser);
  chat.messages.unshift(req.body.newMsg);

  res.json({ status: 'ok' });
});

app.post('/new-message', upload.array(), cors(corsOptions), function(req, res) {
  chat.messages.unshift(req.body.newMsg);

  res.json({ status: 'ok' });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
