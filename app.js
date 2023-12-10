import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import healthzRouter from "./router/healthz.js";
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type', 'application/json');
  next();
});
app.options('*', cors());
app.use(express.json());
// app.use(helmet());
app.use(morgan("combined"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);
app.use("/healthz", healthzRouter);
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});
app.listen(80);
