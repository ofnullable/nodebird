const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
require('dotenv').config();

const db = require('./models');
const passportConfig = require('./passport');

// routers
const userApiRouter = require('./routes/user');
const postApiRouter = require('./routes/post');
const postsApiRouter = require('./routes/posts');

const app = express();
passportConfig();
db.sequelize.sync();

app.use(morgan('dev'));
app.use('/', express.static('uploads'));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https
    },
    name: process.env.EXPRESS_SESSION_NAME,
  }),
);

app.use(passport.initialize());
app.use(passport.session()); // express-session 이후에 실행해야함 ( 내부적으로 express-session 사용 )

// for request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userApiRouter);
app.use('/api/post', postApiRouter);
app.use('/api/posts', postsApiRouter);

app.listen(8000, () => {
  console.log('Server is running on localhost:8000');
});
