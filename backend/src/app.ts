import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import config from "./config";
import path from "path";

import MongoClient from "./models/index";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

import DocumentController from "./controllers/DocumentController";
import UserController from "./controllers/UserController";
import TypeController from "./controllers/TypeController";
import AuthController from "./controllers/AuthController";

import User from "./models/user"

import seed from "./seed"

const app = express();

app.use(logger(config.loggerLevel));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

AuthController.useSession(app);

app.get('/api/test', async (req, res) => {
  const a = await User.find();

  return res.status(200).json(a);
});

app.get('/api/auth/check', AuthController.check)
app.post('/api/auth/login', AuthController.login)
app.post('/api/auth/register', AuthController.register)
app.post('/api/auth/logout', AuthController.logout)

app.get('/api/files', DocumentController.list);
app.get('/api/files/:id', DocumentController.read);
app.post('/api/files/submit', upload.single('file'), DocumentController.submit);

app.get('/api/users/:id/submissions', UserController.submissions);
app.get('/api/users', UserController.list);

app.get('/api/types', TypeController.list);
app.get('/api/types/add', TypeController.add);
app.put("/api/types/:id", TypeController.update);
app.delete("/api/types/:id", TypeController.delete);

app.listen(config.port, async () => {
  console.log("App is running on port " + config.port);
  await MongoClient.connect();

  //Comment following line to not seed
  await seed();
  
});

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Serve react app on production
if (config.environment === 'production') {
  const frontendBuildFolder = path.join(__dirname, '..', 'frontend', 'build');
  app.use(express.static(path.join(frontendBuildFolder)));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildFolder, "index.html"));
  });
}

export default app;
