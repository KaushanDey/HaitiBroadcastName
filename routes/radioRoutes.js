import express from "express";
import { getAllRadio, getRadioByFilter } from "../controllers/radioController.js";

const radioRouter = express.Router();

radioRouter.get("/",getAllRadio);
radioRouter.get("/filters",getRadioByFilter);
export default radioRouter;