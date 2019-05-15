module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', // => users
        {
            userId: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            passwd: {
                type: DataTypes.STRING(100),
                allowNullL: false,
            },
        }, {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });

    User.associate = db => {
        db.User.hasMany(db.Post, { as: 'Posts' });
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings' });
    };
    return User;
};