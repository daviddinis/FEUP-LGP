import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from './config';
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

import MongoClient from "./models/index";
import User from "./models/user";
import File from "./models/file";

import DocParser from './lib/DocumentParser';
import { parse } from 'node:path';

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
  console.log('Hello');

  const parser = new DocParser();

  await parser.ping();

  console.log(await parser.getParsers());

  const parserId = 'cvzcwokujphi';
  const documentId = 'bc7dab2bb30b39d7991ce3557713a2cc';

  const data = await parser.getParsedDocument(parserId, documentId);


  const parseFinancialList = (parsedData : any, keywords : string[]) => {
    return parsedData
        .map((item : any ) => parseFinancialItem(item.key_0, keywords))
        .filter((item : any) => item !== null);
  }

  const parseFinancialItem = (item: string, keywords: string[]) => {
    const line : string = item.replace(/\s\s+/g, ' '); // remove repeated spaces

    const digit = line.search(/\d/)

    const [name, valuesStr] = [ line.slice(0, digit), line.slice(digit, line.length) ]

    const values = valuesStr.split(' ')
        .map(value => value.replace(/['’]/g, '')) // remove '’
        .filter(value => value.search(/[a-z]/i) === -1)

//
    if (!keywords.every(keyword => name.includes(keyword)))
      return null;

    return { line, name, values }
  }


  console.log(parseFinancialList(data[0].assets, ['total', 'assets']));

  /*
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
  */

})

export default app;
