import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import healthzRouter from "./router/healthz.js";
const app = express();

const corsOptions = {
  origin: 'http://front-tier-alb-1611244642.ap-northeast-2.elb.amazonaws.com', // Specify the allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  credentials: true, // Include credentials (cookies, HTTP authentication) in the CORS request
  optionsSuccessStatus: 204, // Respond with a 204 status code for successful preflight requests
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

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
