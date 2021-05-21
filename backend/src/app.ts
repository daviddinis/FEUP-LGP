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

import seed from "./seed"

const app = express();

app.use(logger(config.loggerLevel));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

AuthController.useSession(app);

app.get('/api/auth/check', AuthController.check)
app.post('/api/auth/login', AuthController.login)
app.post('/api/auth/register', AuthController.register)
app.post('/api/auth/logout', AuthController.logout)


app.get('/api/files',AuthController.ensureLogin, DocumentController.list);
app.get('/api/files/self', AuthController.ensureLogin, DocumentController.listSelf);
app.get('/api/files/:id', AuthController.ensureLogin, DocumentController.read);
app.post('/api/files/submit', AuthController.ensureLogin, upload.single('file'), DocumentController.submit);

app.get('/api/users/:id/submissions', AuthController.ensureAdminLogin, UserController.submissions);
app.get('/api/users', AuthController.ensureAdminLogin, UserController.list);
app.post('/api/users/:id/flag', AuthController.ensureAdminLogin, UserController.flag);

app.get('/api/types', AuthController.ensureLogin, TypeController.list);
app.post('/api/types/add', AuthController.ensureAdminLogin, TypeController.add);
app.put("/api/types/:id", AuthController.ensureAdminLogin, TypeController.update);
app.delete("/api/types/:id", AuthController.ensureAdminLogin, TypeController.delete);

app.listen(config.port, async () => {
  console.log("App is running on port " + config.port);
  await MongoClient.connect();

  //Comment following line to not seed
  //await seed();
  
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
