import mongoose from "mongoose";
import radioStation from "../models/radio_stations.js";
import userFav from "../models/user_favorites.js";

export const getAllRadio = async (req, res, next) => {

    let radioStations;
    try {

        radioStations = await radioStation.find();
    } catch (err) {
        console.log(err);
    }
    if (!radioStations) {
        return res.status(404).json({ message: "No Radio stations found!!" });
    } else {
        return res.status(200).json({ radioStations });
    }
};

export const getRadioByFilter = async (req, res, next) => {

    var queryCategory = null;
    if (req.query.category) {
        queryCategory = JSON.parse(req.query.category);
    }

    var queryLocation = null;
    if (req.query.location) {
        queryLocation = JSON.parse(req.query.location);
    }

    console.log(queryCategory);

    let stations;
    var reqStations = new Array();

    try {
        stations = await radioStation.find();
        for (let i = 0; i < stations.length; i++) {

            let flagCategory = null;
            if (queryCategory) {
                const categories = stations[i].category.split(" / ");
                flagCategory = queryCategory.every(element => {
                    return categories.includes(element);
                });
            }

            let flagLocation = null;
            if (queryLocation) {
                var temp = stations[i].location.slice(1);
                temp = temp.slice(0, temp.length - 1);
                const reqLocation = temp.split(", ");

                flagLocation = queryLocation.every(element => {
                    return reqLocation.includes(element);
                });
            }

            if (flagCategory != null && flagLocation != null) {

                if (flagCategory && flagLocation) {
                    reqStations.push(stations[i]);
                }

            } else if (flagCategory == null && flagLocation != null) {

                if (flagLocation) {
                    reqStations.push(stations[i]);
                }

            } else if (flagCategory != null && flagLocation == null) {

                if (flagCategory) {
                    reqStations.push(stations[i]);
                }

            }

        }

    } catch (err) {

        console.log(err);

    }
    if (!reqStations) {

        res.status(404).json({ message: "Data not found!!" });

    } else {

        res.status(200).json({ reqStations });
        console.log(reqStations.length);

    }

};

export const getAllRadioLocation = async (req, res, next) => {

    let radio;
    try {
        radio = await radioStation.find()

    } catch (err) {
        console.log(err);
    }

    var allLocations = {};
    for (let i = 0; i < radio.length; i++) {

        var temp = radio[i].location.slice(1);
        temp = temp.slice(0, temp.length - 1);
        const location = temp.split(", ");

        let arr = [];
        if (!location[1]) continue;
        if(!allLocations[location[1]]){
            arr.push(location[1]);
            allLocations[location[1]] = arr;
        }
        if (allLocations[location[1]]) {
            arr = allLocations[location[1]];
        }
        if(arr.includes(location[0])) continue;
        arr.push(location[0]);
        allLocations[location[1]] = arr;
    }
    
    if (!allLocations) {
        return res.status(404).json({ message: "Data not found!!" });
    }
    return res.status(200).json({ allLocations });

};

export const getAllRadioCategories = async (req,res,next)=>{

    let radio;
    try{
        radio = await radioStation.find();
    }catch(err){
        console.log(err);
    }

    let arr = [];
    for(let i=0;i<radio.length;i++){
        if(radio[i].category){
            const temp = radio[i].category.split(" / ");
            for(let j=0;j<temp.length;j++) arr.push(temp[j]);
        }
    }
    console.log(arr);
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    const categories = removeDuplicates(arr);
    console.log(categories);
    if(!categories){
        return res.status(404).json({message: "Data not found!!"});
    }
    return res.status(200).json({categories});

};

export const postFavoriteStations = async (req, res, next) => {

    const { userID, stations } = req.body;

    let existingUser;
    try{
        existingUser = await userFav.findOneAndUpdate({userID: userID},{
            stations
        });
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        const user = new userFav({
            userID,
            channels: [],
            stations
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
    console.log({existingUser});
    return res.status(200).json({message: "Success!!"});
    // for(let i=0;i<stations.length;i++){
    //     existingUser.stations.push(channels[i]);
    // }
    // try{
    //     const session = await mongoose.startSession();
    //     session.startTransaction();
    //     await existingUser.save({session});
    //     session.commitTransaction();
    //     console.log({existingUser});
    // }catch(err){
    //     console.log(err);
    //     return res.status(500).json({message: "Failed!!"});
    // }
    // return res.status(200).json({message: "Success!!"});

};