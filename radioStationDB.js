import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import radioStation from "./models/radio_stations.js";
import radioStationsJSON from "./json/radio_stations.json" assert {type: "json"};

const start = async ()=> {

    try {
        await connectDB(process.env.MONGODB_URL);
        await radioStation.create(radioStationsJSON);
        console.log("Success!!");
    }catch(err){
        console.log(err);
    }
};

start();