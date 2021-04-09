import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from './config';
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

import MongoClient from "./models/index";
import User from "./models/user";
import File from "./models/file";

const app = express();

app.use(logger(config.loggerLevel));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.post('/sendFile', upload.single('file'), async function (req: any, res: any) {

  const file = await File.create({
    path: req.file.path,
    name: req.file.originalname
  })
  
  return res.send(200).end();
});

app.get('/healthcheck', (req, res, next) => {
  res.status(200).send('OK');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

app.listen(config.port, async () => {
  await MongoClient.connect();

  const name = "NewName" + Math.random();
  
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
