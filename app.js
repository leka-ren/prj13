const express = require('express');

const { json } = require('body-parser');

const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');

const app = express();

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const baseUrl = 'mongodb://localhost:27017/mestodb';

app.use(json());

mongoose.connect(baseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => res.status(404).send({ message: '404 такой страницы не существует' }));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started, listening on ${PORT}`));
