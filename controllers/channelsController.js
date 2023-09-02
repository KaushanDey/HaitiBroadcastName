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

export const getChannelsByFilter = async (req,res,next) =>{

    var queryCategory = null;
    if(req.query.category!=[]){
        queryCategory = req.query.category;
    }

    var queryLocation=null;
    if(req.query.location!=[]){
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

        return res.status(404).json({ channels });

    }else{

        console.log(reqChannels.length);
        return res.status(200).json({reqChannels});      

    }

};

// export const getChannelsByFilter = async (req, res, next) => {

//     const { category, location } = req.body;
//     console.log(category);
//     let channels;
//     var reqChannels = new Array();
//     try {

//         channels = await tvChannel.find();
//         for (let i = 0; i < channels.length; i++) {
//             let flagCategory = null;
//             if (category!=null) {
//                 const reqCategory = channels[i].category;
//                 flagCategory = (category === reqCategory);
//             }

//             let flagLocation = null;
//             if (location!=null) {
//                 const reqLocation = channels[i].location.split(", ");
//                 flagLocation = location.every(element => {
//                     return reqLocation.includes(element);
//                 });
//             }

//             if (flagCategory != null && flagLocation != null) {

//                 if (flagCategory && flagLocation) {
//                     reqChannels.push(channels[i]);
//                 }

//             } else if (flagCategory != null && flagLocation == null) {

//                 if (flagCategory) {
//                     reqChannels.push(channels[i]);
//                 }

//             } else if (flagCategory == null && flagLocation != null) {

//                 if (flagLocation) {
//                     reqChannels.push(channels[i]);
//                 }

//             }
//         }
//     }catch(err){
//         console.log(err);
//     }

//     if(!reqChannels){
//         return res.status(404).json({message: "Data not found!!"});
//     }
//     console.log(reqChannels.length);
//     return res.status(200).json({reqChannels});
// };

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