import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import channelRouter from "./routes/channelRoutes.js";
import radioRouter from "./routes/radioRoutes.js";
import connectDB from "./db/connect.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/channels",channelRouter);
app.use("/radio",radioRouter);

const start = async ()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log("Example app listening on http://localhost:%s",PORT);
        });
    }
    catch(err){
        console.log("Failed to connect!!")
    }
};
start();