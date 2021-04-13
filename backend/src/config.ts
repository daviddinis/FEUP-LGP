import dotenv = require('dotenv');

dotenv.config();

export default {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  loggerLevel: process.env.LOGGER_LEVEL || 'dev',
  mongoUrl: process.env.DB_URL || 'mongodb://localhost:27017',
  docparserApiKey: process.env.DOCPARSER_API_KEY,
  docparserParserId: process.env.DOCPARSER_PARSERID
}
