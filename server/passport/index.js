const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('Do serializeUser');
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log('Do deserializeUser');
        try {
            const user = await db.User.findOne({
                where: { id },
            });
            return done(null, user); // req.user에 저장된다.
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });

    local();
};
