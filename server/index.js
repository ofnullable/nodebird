const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const hpp = require('hpp');
const helmet = require('helmet');

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

const prod = process.env.NODE_ENV === 'production';

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: 'front-end url',
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use('/', express.static('uploads'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https
      domain: prod && '.front.com',
    },
    name: process.env.EXPRESS_SESSION_NAME,
  })
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
