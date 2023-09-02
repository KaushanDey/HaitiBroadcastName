import express from "express";
import { getAllChannelsCategories, getAllChannelsLocation, getChannelsByFilter, postFavoriteChannels } from "../controllers/channelsController.js";

const channelRouter = express.Router();

// channelRouter.get('/',getAllChannels);
channelRouter.get('/',getChannelsByFilter);
channelRouter.get('/locations',getAllChannelsLocation);
channelRouter.get('/categories',getAllChannelsCategories);
channelRouter.post('/post/favorites',postFavoriteChannels);

export default channelRouter;