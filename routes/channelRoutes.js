import express from "express";
import { getAllChannels, getChannelsByFilter } from "../controllers/channelsController.js";

const channelRouter = express.Router();
channelRouter.get('/',getAllChannels);
channelRouter.get('/filters',getChannelsByFilter);
// channelRouter.get('/location/:location',getChannelsByLocation);

export default channelRouter;