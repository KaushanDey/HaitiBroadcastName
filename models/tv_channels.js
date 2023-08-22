import mongoose from "mongoose";

const tvChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: false,
        default: ""
    },
    info: {
        type: String,
        required: false,
        default: ""
    },
    stream: {
        type: String,
        required: true
    },
    logo_url: {
        type: String,
        required: true
    }
});

export default mongoose.model("TV_Channel",tvChannelSchema);