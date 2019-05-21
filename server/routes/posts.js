const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:tag', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.Image,
        },
      ],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
