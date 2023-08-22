import mongoose from "mongoose";
import radioStation from "../models/radio_stations.js";

export const getAllRadio = async (req, res,next) => {

    let radioStations;
    try{
        
        radioStations = await radioStation.find();
    }catch(err){
        console.log(err);
    }
    if(!radioStations){
        return res.status(404).json({message: "No Radio stations found!!"});
    }else{
        return res.status(200).json({radioStations});
    }
};