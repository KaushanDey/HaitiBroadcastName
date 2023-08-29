import express from "express";
import { getAllRadio, getAllRadioCategories, getAllRadioLocation } from "../controllers/radioController.js";

const radioRouter = express.Router();

radioRouter.get("/",getAllRadio);
// radioRouter.get("/filters",getRadioByFilter);
radioRouter.get("/locations",getAllRadioLocation);
radioRouter.get("/categories",getAllRadioCategories);

export default radioRouter;