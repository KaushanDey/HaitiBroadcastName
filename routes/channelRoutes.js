import express from "express";
import { getAllChannels, getAllChannelsCategories, getAllChannelsLocation } from "../controllers/channelsController.js";

const channelRouter = express.Router();

channelRouter.get('/',getAllChannels);
// channelRouter.post('/filters',getChannelsByFilter);
channelRouter.get('/locations',getAllChannelsLocation);
channelRouter.get('/categories',getAllChannelsCategories);

export default channelRouter;