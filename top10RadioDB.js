import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import topRadioStation from "./models/top10_radio.js";
import topRadioStationsJSON from "./json/top10_radio.json" assert {type: "json"};

const start = async ()=> {

    try {
        await connectDB(process.env.MONGODB_URL);
        await topRadioStation.create(topRadioStationsJSON);
        console.log("Success!!");
    }catch(err){
        console.log(err);
    }
};

start();