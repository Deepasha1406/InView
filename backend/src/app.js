import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js"; 
import usersRoutes from "./routes/usersRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", usersRoutes);

const start = async () => {
  app.set("mongo_user", process.env.Mongo_URI);
  const connectionDb = await mongoose.connect(process.env.Mongo_URI);
  console.log(`mongo connected : ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
    console.log("Port is listening ");
    });
}

start();