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

export const getRadioByFilter = async (req,res,next)=>{

    var queryCategory = null;
    if(req.query.category){
        queryCategory = JSON.parse(req.query.category);
    }

    var queryLocation = null;
    if(req.query.location){
        queryLocation = JSON.parse(req.query.location);
    }

    console.log(queryCategory);

    let stations;
    var reqStations = new Array();

    try{
        stations = await radioStation.find();
        for(let i=0;i<stations.length;i++){

            let flagCategory = null;
            if(queryCategory){
                const categories = stations[i].category.split(" / ");
                flagCategory = queryCategory.every(element => {
                    return categories.includes(element);
                });
            }
            
            let flagLocation = null;
            if(queryLocation){
                var temp = stations[i].location.slice(1);
                temp = temp.slice(0,temp.length-1);
                const reqLocation = temp.split(", ");

                flagLocation = queryLocation.every(element =>{
                    return reqLocation.includes(element);
                });
            }
            
            if(flagCategory!=null && flagLocation!=null){

                if(flagCategory && flagLocation){
                    reqStations.push(stations[i]);
                }

            }else if(flagCategory==null && flagLocation!=null){

                if(flagLocation){
                    reqStations.push(stations[i]);
                }

            }else if(flagCategory!=null && flagLocation==null){

                if(flagCategory){
                    reqStations.push(stations[i]);
                }

            }
            
        }

    }catch(err){

        console.log(err);

    }
    if(!reqStations){

        res.status(404).json({message: "Data not found!!"});

    }else{

        res.status(200).json({reqStations});
        console.log(reqStations.length);
        
    }

};