import express from "express";
import { getAllChannels } from "../controllers/channelsController.js";

const channelRouter = express.Router();
channelRouter.get('/',getAllChannels);
// channelRouter.get('/name/:name',getChannelsByName);
// channelRouter.get('/location/:location',getChannelsByLocation);

export default channelRouter;