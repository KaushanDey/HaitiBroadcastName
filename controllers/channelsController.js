import mongoose from 'mongoose';
import tvChannel from "../models/tv_channels.js"

export const getAllChannels = async (req,res,next) =>{

    let tvChannels;
    try{
        tvChannels = await tvChannel.find();
    }catch(err){
        console.log(err);
    }
    if(!tvChannels){
        return res.status(404).json({message: "No TV Channels found!!"});
    }else{
        return res.status(200).json({tvChannels});
    }
    
};

export const getChannelsByFilter = async (req,res,next) =>{
    
    var queryCategory = null;
    if(req.query.category){
        queryCategory = req.query.category;
    }
    
    var queryLocation=null;
    if(req.query.location){
        queryLocation = JSON.parse(req.query.location);
    }

    console.log(queryCategory);

    let channels;
    var reqChannels = new Array();

    try{

        channels = await tvChannel.find();

        for(let i=0;i<channels.length;i++){

            let flagCategory = null;
            if(queryCategory){
                const reqCategory = channels[i].category;
                flagCategory = (queryCategory===reqCategory);
            }

            let flagLocation = null;
            if(queryLocation){
                const reqLocation = channels[i].location.split(", ");
                flagLocation = queryLocation.every(element =>{
                    return reqLocation.includes(element);
                });
            }
            
            if(flagCategory!=null && flagLocation!=null){

                if(flagCategory && flagLocation){
                    reqChannels.push(channels[i]);
                }

            }else if(flagCategory!=null && flagLocation==null){

                if(flagCategory){
                    reqChannels.push(channels[i]);
                }

            }else if(flagCategory==null && flagLocation!=null){

                if(flagLocation){
                    reqChannels.push(channels[i]);
                }

            }
        }

    }catch(err){

        console.log(err);

    }
    if(!reqChannels){

        res.status(404).json({message: "Data not found!!"});

    }else{

        res.status(200).json({reqChannels});
        console.log(reqChannels.length);

    }
    
};