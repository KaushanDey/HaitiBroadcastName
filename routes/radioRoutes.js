import express from "express";
import { getAllRadio, getAllRadioCategories, getAllRadioLocation, postFavoriteStations } from "../controllers/radioController.js";

const radioRouter = express.Router();

radioRouter.get("/",getAllRadio);
// radioRouter.get("/filters",getRadioByFilter);
radioRouter.get("/locations",getAllRadioLocation);
radioRouter.get("/categories",getAllRadioCategories);
radioRouter.post("/post/favorites",postFavoriteStations);

export default radioRouter;