const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_CONNECTION,
  "logging": false,
  "dialectOptions": {
    dateStrings: true,
    typeCast: true
  },
  "timezone": process.env.TIME_ZONE,
};
