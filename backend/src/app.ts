import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from './config';

import MongoClient from './models/index';
import User from './models/user';
import File from './models/file';
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })


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

app.get('/files', async (req, res) => {
  const files = await File.find();
  return res.status(200).json(files);
});

app.listen(config.port, async () => {
  await MongoClient.connect();

  const name = 'NewName' + Math.random();
  const user = await User.create({
    username: name
  })

  console.log(user)

  const user2 = await User.find({
    username: name
  })

  console.log(user2);


})

export default app;
