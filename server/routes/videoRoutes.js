import express from "express";
import generateVideo from "../controllers/videoController.js";
import userAuth from "../middlewares/auth.js";

const videoRouter = express.Router();

videoRouter.post("/generate-video", userAuth, generateVideo);

export default videoRouter;