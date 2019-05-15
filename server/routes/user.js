const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');

const router = express.Router();
// /api/user

router.post('/sign-in', (req, res) => { });
router.post('/sign-out', (req, res) => { });

router.get('/', (req, res) => { });
router.post('/', async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.id,
            },
        });
        if (exUser) {
            return res.status(403).send('Already used user id');
        }

        const hashedPasswd = await bcrypt.hash(req.body.passwd, 11);
        const newUser = await db.User.create({
            userId: req.body.userId,
            nickname: req.body.nickname,
            passwd: hashedPasswd,
        });

        console.log(newUser);
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