const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWD,
    "database": "nodebird",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWD,
    "database": "nodebird",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWD,
    "database": "nodebird",
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}