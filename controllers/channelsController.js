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

// export const getChannelsByName = (req,res,next)=>{

//     try{
//         const {name} = req.params;
//         console.log(name);
//         let flag = false;
//         for(let i in TV_Musique){
//             if(TV_Musique[i].name===name){
//                 flag = true;
//                 return res.status(200).json(TV_Musique[i]);
//             }
//         }
//         if(!flag){
//             return res.status(400).json({message:"Not Found!!"});
//         }
//     }catch(err){
//         console.log("Not Found!!");
//     }
// };

// export const getChannelsByLocation = (req,res,next)=>{

//     try{
//         const {location} = req.params;
//         let flag = false;
//         var channels = new Array();
//         console.log(location);
//         for(let i in TV_Musique){
//             if(TV_Musique[i].location===location){
//                 flag = true;
//                 channels.push(TV_Musique[i]);
//             }
//         }
//         if(!flag){
//             return res.status(400).json({message:"Not Found!!"});
//         }
//         return res.status(200).json({channels});
//     }catch(err){
//         console.log("Not Found!!");
//     }
// };