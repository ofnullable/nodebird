const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'passwd',
    }, async (userId, passwd, done) => {
        console.log('Do passport local strategy');
        try {
            const user = await db.User.findOne({ where: { userId } });
            if (!user) {
                return done(null, false, { reason: 'User does not exist!' });
            }
            const result = await bcrypt.compare(passwd, user.passwd); // 일치하면 true
            if (result) {
                return done(null, user.toJSON());
            }
            return done(null, false, { reason: 'Password does not match!' });
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }));
};
