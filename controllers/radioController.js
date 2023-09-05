import mongoose from "mongoose";
import radioStation from "../models/radio_stations.js";
import userFav from "../models/user_favorites.js";

// export const getAllRadio = async (req, res, next) => {

//     let radioStations;
//     try {

//         radioStations = await radioStation.find();
//     } catch (err) {
//         console.log(err);
//     }
//     if (!radioStations) {
//         return res.status(404).json({ message: "No Radio stations found!!" });
//     } else {
//         return res.status(200).json({ radioStations });
//     }
// };

export const getRadioByFilter = async (req, res, next) => {

    // var queryCategory = null;
    // if (req.query.category) {
    //     queryCategory = JSON.parse(req.query.category);
    // }

    // var queryLocation = null;
    // if (req.query.location) {
    //     queryLocation = JSON.parse(req.query.location);
    // }

    // console.log(queryCategory);

    // let stations;
    // var reqStations = new Array();

    // try {
    //     stations = await radioStation.find();
    //     for (let i = 0; i < stations.length; i++) {

    //         let flagCategory = null;
    //         if (queryCategory) {
            // const categories = stations[i].category.split(" / ");
    //             flagCategory = queryCategory.every(element => {
    //                 return categories.includes(element);
    //             });
    //         }

    //         let flagLocation = null;
    //         if (queryLocation) {
    //             var temp = stations[i].location.slice(1);
    //             temp = temp.slice(0, temp.length - 1);
    //             const reqLocation = temp.split(", ");

    //             flagLocation = queryLocation.every(element => {
    //                 return reqLocation.includes(element);
    //             });
    //         }

    //         if (flagCategory != null && flagLocation != null) {

    //             if (flagCategory && flagLocation) {
    //                 reqStations.push(stations[i]);
    //             }

    //         } else if (flagCategory == null && flagLocation != null) {

    //             if (flagLocation) {
    //                 reqStations.push(stations[i]);
    //             }

    //         } else if (flagCategory != null && flagLocation == null) {

    //             if (flagCategory) {
    //                 reqStations.push(stations[i]);
    //             }

    //         }

    //     }

    //     if (!reqStations) {

    //         res.status(404).json({ message: "Data not found!!" });
    
    //     } else {
    
    //         res.status(200).json({ reqStations });
    //         console.log(reqStations.length);
    
    //     }

    // } catch (err) {

    //     console.log(err);

    // }

    let queryCategory = false;
    if(req.query.category!=null && req.query.category.length!=0){
        queryCategory = JSON.parse(req.query.category);
    }

    let queryLocation = false;
    if(req.query.location!=null && req.query.location.length!=0){
        queryLocation = JSON.parse(req.query.location);
    }

    console.log(queryCategory);
    console.log(queryLocation);

    try{

        let stations = await radioStation.find();
        let reqStations = [];
        for(let i=0;i<stations.length;i++){

            let flagCategory = false;
            if (queryCategory!=false) {
                const categories = stations[i].category.split(" / ");
                for(let j=0;j<queryCategory.length;j++){
                    if(categories.includes(queryCategory[j])){
                        flagCategory = true;
                        break;
                    }
                }
            }
            let flagLocation = false;
            if (queryLocation != false) {
                let locations;
                if(stations[i].location[0]==='('){
                    let temp = stations[i].location.slice(1);
                    temp = temp.slice(0, temp.length - 1);
                    locations = temp.split(", ")[0];
                }else{
                    locations = stations[i].location.split(", ")[0];
                }
                if(queryLocation.includes(locations)){
                    flagLocation = true;
                }
            }

            if(queryCategory!=false && queryLocation!=false){
                if(flagCategory && flagLocation){
                    reqStations.push(stations[i]);
                }
            }else if(queryCategory!=false && queryLocation==false){
                if(flagCategory){
                    reqStations.push(stations[i]);
                }
            }else if(queryCategory==false && queryLocation!=false){
                if(flagLocation){
                    reqStations.push(stations[i]);
                }
            }
        }

        if(queryCategory==false && queryLocation==false){
            console.log("All Channels");
            console.log(stations.length);
            return res.status(200).json({stations});
        }else{
            stations = reqStations;
            if(reqStations.length===0){
                return res.status(404).json();
            }
            console.log("Filtered Channels");
            console.log(stations.length);
            return res.status(200).json({stations});      
    
        }

    }catch(err){
        res.status(404).json({err});
        console.log(err);

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

        let location;
        if(radio[i].location[0]==='('){
            var temp = radio[i].location.slice(1);
            temp = temp.slice(0, temp.length - 1);
            location = temp.split(", ");
        }else{
            location = radio[i].location.split(", ");
        }
        

        let arr = [];
        if (!location[1]) continue;
        if (allLocations[location[1]]) {
            arr = allLocations[location[1]];
        }
        if(arr.includes(location[0])) continue;
        arr.push(location[0]);
        allLocations[location[1]] = arr;
    }
    
    if (!allLocations) {
        return res.status(404).json();
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