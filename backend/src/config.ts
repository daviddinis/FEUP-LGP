import dotenv = require('dotenv');

dotenv.config();

export default {
  port: process.env.PORT || 3001,
  loggerLevel: process.env.LOGGER_LEVEL || 'dev',
  appUrl: process.env.APP_URL,
  mongoUrl: process.env.DB_URL || 'mongodb://localhost:27017'
}
