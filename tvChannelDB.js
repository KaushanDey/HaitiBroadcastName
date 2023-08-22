import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import tvChannel from "./models/tv_channels.js";
import tvChannelsJSON from "./json/tv_channels.json" assert {type: "json"};

const start = async ()=> {

    try {
        await connectDB(process.env.MONGODB_URL);
        await tvChannel.create(tvChannelsJSON);
        console.log("Success!!");
    }catch(err){
        console.log(err);
    }
};

start();