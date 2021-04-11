import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from './config';
import path from 'path';

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

import MongoClient from "./models/index";

import DocumentController from "./controllers/DocumentController";
import UserController from "./controllers/UserController";

const app = express();

app.use(logger(config.loggerLevel));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/files/:id', DocumentController.read);
app.post('/sendFile', upload.single('file'), DocumentController.submit);

app.get('/users', UserController.list);
app.post('/test-db', UserController.testDB)

app.listen(config.port, async () => {
  await MongoClient.connect();
  console.log("App is running on port " + config.port);
})

// Serve react app on production

if (config.environment === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


export default app;
