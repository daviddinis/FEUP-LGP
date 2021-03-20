import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from './config';

const app = express();

app.use(logger(config.loggerLevel));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/healthcheck', (req, res, next) => {
  res.status(200).send('OK');
});

app.listen(config.port, () => {
  console.log("Hi");
})

export default app;
