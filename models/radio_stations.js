import mongoose from "mongoose";

const radioStationSchema = new mongoose.Schema({
    radio_name: {
        type: String,
        required: true
    },
    radio_station: {
        type: String,
        required: false,
        default: ""
    },
    location: {
        type: String,
        required: false,
        default: ""
    },
    category: {
        type: String,
        required: false,
        default: ""
    },
    web: {
        type: String,
        required: false,
        default: ""
    },
    stream: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false,
        default: ""
    },
    slogan: {
        type: String,
        required: false,
        default: ""
    },
    logo_url: {
        type: String,
        required: true
    }
});

export default mongoose.model("Radio_Station",radioStationSchema);