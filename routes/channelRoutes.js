import express from "express";
import { getAllChannels, getAllChannelsCategories, getAllChannelsLocation, getChannelsByFilter, postFavoriteChannels } from "../controllers/channelsController.js";

const channelRouter = express.Router();

channelRouter.get('/',getAllChannels);
channelRouter.post('/filters',getChannelsByFilter);
channelRouter.get('/locations',getAllChannelsLocation);
channelRouter.get('/categories',getAllChannelsCategories);
channelRouter.post('/post/favorites',postFavoriteChannels);

export default channelRouter;