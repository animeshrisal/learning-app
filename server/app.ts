import express, { Request, Response,  } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import routes from "./routes";
import {  socket } from "./middleware/webSocket";
import { Server } from "http";
import * as dotenv from "dotenv";

const app = express();
const path = require("path");

// Call midlewares
app.use(cors({ origin: '*'}));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(bodyParser.json());

dotenv.config();

//Set all routes from routes folder
// register express routes from defined application routes

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api/v1", routes);

app.use("/uploads", express.static("uploads"));
const server: Server = app.listen(8000);
socket(server);
