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
app.use(express.urlencoded({limt: "40kb", extended: true}));

app.use("/api/v1/users", usersRoutes);

const start = async () => {
  app.set("mongo_user")
  const connectionDb = await mongoose.connect("mongodb+srv://deepasha1406_db_user:tsm9vv2rhN6AnEoV@cluster0.mpqtbze.mongodb.net/?appName=Cluster0")
  console.log(`mongo connected : ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
    console.log("Port is listening ");
    });
}

start();