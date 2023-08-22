import express from "express";
import { getAllRadio } from "../controllers/radioController.js";

const radioRouter = express.Router();

radioRouter.get("/",getAllRadio);

export default radioRouter;