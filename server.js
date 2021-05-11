const bodyParser = require('body-parser');
require('./connectDb');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const loginRoute = require('./routes/user/signin');
const signupRoute = require('./routes/user/signup');
const childRoute = require('./routes/child/child');
const districtRoute = require('./routes/district/district');
const stateRoute = require('./routes/state/state');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('room');
});

// routes

app.use('/api/signin', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/child', childRoute);
app.use('/api/state', stateRoute);
app.use('/api/district', districtRoute);

app.listen(port, () => console.log(`server running on ${port}`));
