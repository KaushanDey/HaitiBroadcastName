import mongoose from "mongoose";

const userFavoritesSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: true
    },
    channels: [{
        type: String,
        required: false
    }],
    stations: [{
        type: String,
        required: false
    }]
});

export default mongoose.model("User_Favorite",userFavoritesSchema);