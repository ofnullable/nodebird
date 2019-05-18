const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');

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
                    include: [{
                        model: db.Post,
                    }, {
                        model: db.User,
                        as: 'Followers'
                    }, {
                        model: db.User,
                        as: 'Followings'
                    }],
                    attributes: ['id', 'userId', 'nickname']
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

router.get('/', (req, res) => { });
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

router.get('/:id', (req, res) => { });
router.get('/:id/follow', (req, res) => { });
router.post('/:id/follow', (req, res) => { });
router.delete('/:id/follow', (req, res) => { });
router.delete('/:id/follower', (req, res) => { });
router.get('/:id/posts', (req, res) => { });

module.exports = router;