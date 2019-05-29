const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId);
    let where = {};
    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId,
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
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
        {
          model: db.Post,
          as: 'Retweet',
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname'],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      limit: parseInt(req.query.limit, 10),
      order: [['createdAt', 'DESC']],
    });
    return res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/tag/:tag', async (req, res, next) => {
  try {
    const lastId = parseInt(req.query.lastId);
    let where = {};
    if (lastId) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: lastId,
        },
      };
    }
    const posts = await db.Post.findAll({
      where,
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
        {
          model: db.User,
          through: 'Like',
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: db.Post,
          as: 'Retweet',
          include: [
            {
              model: db.User,
              attributes: ['id', 'nickname'],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
      limit: parseInt(req.query.limit, 10),
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
