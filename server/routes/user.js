const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');
const { isSignIn } = require('./middleware');

const router = express.Router();

router.post('/sign-in', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(400).send(info.reason);
    }
    return req.login(user, async signInErr => {
      try {
        if (signInErr) {
          return next(signInErr);
        }
        // const filteredUser = Object.assign({}, user);
        // delete filteredUser.passwd;
        const filteredUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
            },
            {
              model: db.User,
              as: 'Followers',
            },
            {
              model: db.User,
              as: 'Followings',
            },
          ],
          attributes: ['id', 'userId', 'nickname'],
        });
        return res.json(filteredUser);
      } catch (e) {
        console.error(e);
        next(e);
      }
    });
  })(req, res, next);
});

router.post('/sign-out', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('sign-out success!');
});

router.get('/', isSignIn, async (req, res) => {
  if (!req.user) {
    return res.status(401).send('Need sign in!');
  }
  const filteredUser = await db.User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: db.Post,
      },
      {
        model: db.User,
        as: 'Followers',
      },
      {
        model: db.User,
        as: 'Followings',
      },
    ],
    attributes: ['id', 'userId', 'nickname'],
  });
  return res.json(filteredUser);
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('ID already in use');
    }

    const hashedPasswd = await bcrypt.hash(req.body.passwd, 11);
    const newUser = await db.User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      passwd: hashedPasswd,
    });

    return res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      attributes: ['id', 'nickname'],
      include: [
        { model: db.Post, attributes: ['id'] },
        {
          model: db.User,
          as: 'Followers',
          attributes: ['id'],
        },
        {
          model: db.User,
          as: 'Followings',
          attributes: ['id'],
        },
      ],
    });
    const jsonUser = user.toJSON();
    jsonUser.Post = jsonUser.Post ? jsonUser.Post.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    return res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10),
        RetweetId: null,
      },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.Image,
        },
      ],
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id/follow', async (req, res, next) => {});

router.post('/:id/follow', isSignIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follow', isSignIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follower', async (req, res, next) => {});

module.exports = router;
