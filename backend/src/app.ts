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
import DataExtractor from './lib/DataExtractor';

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

/*
\d{1,2}[\/\-\s*]?((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*|\d{2})(\/|-|\s*)?(\d{4})

 */
app.listen(config.port, async () => {
  const parser = new DocParser();

  await parser.ping();

  console.log(await parser.getParsers());

  const parserId = 'cvzcwokujphi';
 // const documentId = 'bc7dab2bb30b39d7991ce3557713a2cc'; // AFCA
  const documentId = '087782204d4bf8cd57365b736d61e53b'; // KB

  const data = await parser.getParsedDocument(parserId, documentId);


  const strings = DataExtractor.extractStringArray(data.all_data_regex);
  console.log(DataExtractor.findDataNearKeywords(strings, [/address/i], {
    maxDistance: 1,
  }))

  console.log(DataExtractor.findDataNearKeywords(strings, [/company number/i], {
    maxDistance: 1,
    regex: /[0-9]{4,}/i, // minimum 4 digits
  }))


  console.log(DataExtractor.findDataNearKeywords(strings, [/company/i], {
    maxDistance: 1,
    includeKeyword: true,
  }))

  console.log(DataExtractor.findDataNearKeywords(strings, [/created on/, /incorporated on/i], {
    maxDistance: 1,
    regex: DataExtractor.regexes.DATE
  }))

  console.log(DataExtractor.findDataNearKeywords(strings, [/.*/], {
    maxDistance: 1,
    regex: DataExtractor.regexes.DATE
  }))

  console.log('2020-19-20 2020 Mar 29  March, 29, 200 29 April 29'.match(DataExtractor.regexes.DATE))



 // console.log(extractor.parseFinancialList(data.assets, ['total', 'assets']));

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
