const express = require('express');

const db = require('./models');

// routers
const userApiRouter = require('./routes/user');
const postApiRouter = require('./routes/post');
const postsApiRouter = require('./routes/posts');

const app = express();
db.sequelize.sync();

// for request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userApiRouter);
app.use('/api/post', postApiRouter);
app.use('/api/posts', postsApiRouter);

app.listen(8000, () => {
    console.log('Server is running on localhost:8000');
});