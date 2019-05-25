const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isSignIn } = require('./middleware');
const router = express.Router();

const upload = multer({
  // server에 저장.
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});
// upload.fields([{ name: 'image' }, { name: 'and' }, { name: 'something' }]);

router.post('/', isSignIn, upload.none(), async (req, res, next) => {
  // 여기서 업로드하는게 아니기 때문에 upload.none()
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      UserId: req.user.id,
      content: req.body.content,
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map(i => {
            return db.Image.create({ src: i });
          })
        );
        await newPost.addImages(images);
      } else {
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }

    // const user = await newPost.getUser();
    // newPost.User = user;
    // res.json(newPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attribute: ['id', 'userId', 'nickname'],
        },
        {
          model: db.Image,
        },
      ],
    });
    return res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', isSignIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    const comments = await db.Comment.findAll({
      where: { PostId: post.id },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment', isSignIn, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send('Need Sign in first');
    }
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: { id: newComment.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', upload.array('image'), (req, res) => {
  return res.json(req.files.map(v => v.filename));
});

router.post('/:id/like', isSignIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    await post.addLiker(req.user.id);
    return res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/like', isSignIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    await post.removeLiker(req.user.id);
    return res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/retweet', isSignIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          as: 'Retweet',
        },
      ],
    });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('Can not retweet yours');
    }
    const retweetTarget = post.RetweetId || post.id; // retweet 을 retweet하는건지 원본을 retweet하는건지 check
    const exPost = await db.Post.findOne({
      where: { UserId: req.user.id, RetweetId: retweetTarget },
    });
    if (exPost) {
      return res.status(403).send('Already Retweet');
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTarget,
      content: 'retweet',
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
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
    });
    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
