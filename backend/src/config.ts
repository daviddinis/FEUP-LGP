import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  loggerLevel: process.env.LOGGER_LEVEL || 'dev',
  appUrl: process.env.APP_URL,
  mongoUrl: process.env.DB_URL
}
