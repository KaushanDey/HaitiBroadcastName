import mongoose from 'mongoose';
import tvChannel from "../models/tv_channels.js";
import userFav from "../models/user_favorites.js";


// export const getAllChannels = async (req, res, next) => {

//     let tvChannels;
//     try {
//         tvChannels = await tvChannel.find();
//     } catch (err) {
//         console.log(err);
//     }
//     if (!tvChannels) {
//         return res.status(404).json({ message: "No TV Channels found!!" });
//     } else {
//         return res.status(200).json({ tvChannels });
//     }

// };

// export const getChannelsByFilter = async (req,res,next) =>{

//     let queryCategory = false;
//     if(req.query.category!=null && req.query.category.length!=0){
//         queryCategory = JSON.parse(req.query.category);
//     }

//     let queryLocation = false;
//     if(req.query.location!=null && req.query.location.length!=0){
//         queryLocation = JSON.parse(req.query.location);
//     }

//     console.log(queryCategory);
//     console.log(queryLocation);

//     try{

//         let channels = await tvChannel.find();

//         if (queryCategory!=false) {
//             channels = channels.filter(channel => queryCategory.includes(channel.category));
//         }

//         if (queryLocation != false) {
//             channels = channels.filter(channel => queryLocation.includes(channel.location));
//         }

//         if(channels.length===0){
//             console.log(channels.length);
//             return res.status(404).json({message: "Data not found!!"});
    
//         }else{
    
//             console.log("Filtered Channels");
//             console.log(channels.length);
//             return res.status(200).json({channels});      
    
//         }

//     }catch(err){
//         res.status(404).json({err});
//         console.log(err);

//     }
    

// };

export const getChannelsByFilter = async (req, res, next) => {

    const { category, location } = req.body;
    console.log(category);
    const queryCategory  = category.split(',');
    let channels;
    var reqChannels = new Array();
    try {

        channels = await tvChannel.find();
        for (let i = 0; i < channels.length; i++) {
            let flagCategory = null;
            if (category!=null) {
                const reqCategory = channels[i].category;
                flagCategory = queryCategory.includes(reqCategory);
            }

            let flagLocation = null;
            if (location!=null) {
                const reqLocation = channels[i].location;
                flagLocation = location.includes(reqLocation);
            }

            if (flagCategory != null && flagLocation != null) {

                if (flagCategory && flagLocation) {
                    reqChannels.push(channels[i]);
                }

            } else if (flagCategory != null && flagLocation == null) {

                if (flagCategory) {
                    reqChannels.push(channels[i]);
                }

            } else if (flagCategory == null && flagLocation != null) {

                if (flagLocation) {
                    reqChannels.push(channels[i]);
                }

            }
        }
    }catch(err){
        console.log(err);
    }

    if(!reqChannels){
        return res.status(404).json({message: "Data not found!!"});
    }
    console.log(reqChannels.length);
    return res.status(200).json({reqChannels});
};

export const getAllChannelsLocation = async (req, res, next) => {

    let channels;
    try {
        channels = await tvChannel.find()

    } catch (err) {
        console.log(err);
    }
    let arr = [];
    for (let i = 0; i < channels.length; i++) {
        if (channels[i].location) arr.push(channels[i].location);
    }
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    const locations = removeDuplicates(arr);
    if (!locations) {
        return res.status(404).json({ message: "Data not found!!" });
    }
    return res.status(200).json({ locations });
};

export const getAllChannelsCategories = async (req, res, next) => {

    let channels;
    try {
        channels = await tvChannel.find()

    } catch (err) {
        console.log(err);
    }
    let arr = [];
    for (let i = 0; i < channels.length; i++) {
        if (channels[i].category) arr.push(channels[i].category);
    }
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    const categories = removeDuplicates(arr);
    if (!categories) {
        return res.status(404).json({ message: "Data not found!!" });
    }
    return res.status(200).json({ categories });
};

export const postFavoriteChannels = async (req, res, next) => {

    const { userID, channels } = req.body;

    let existingUser;
    try{
        existingUser = await userFav.findOne({userID: userID});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        const user = new userFav({
            userID,
            channels,
            stations: []
        });
        try{
            await user.save();
            console.log({user})
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Failed!!"});
        }
        return res.status(200).json({message: "Success!!"});
    }
    for(let i=0;i<channels.length;i++){
        existingUser.channels.push(channels[i]);
    }
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await existingUser.save({session});
        session.commitTransaction();
        console.log({existingUser});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Failed!!"});
    }
    return res.status(200).json({message: "Success!!"});

};