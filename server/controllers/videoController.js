import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath(ffmpegPath);

const generateVideo = async (req, res) => {
  try {

    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Generate Image (same API you already use)
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // Save image temporarily
    const imagePath = `temp_${Date.now()}.png`;
    fs.writeFileSync(imagePath, data);

    const videoPath = `video_${Date.now()}.mp4`;

    // Create video animation
    await new Promise((resolve, reject) => {
      ffmpeg(imagePath)
        .loop(5)
        .videoFilters("zoompan=z='zoom+0.001':d=125")
        .fps(25)
        .size("1024x1024")
        .output(videoPath)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    const videoBuffer = fs.readFileSync(videoPath);
    const base64Video = videoBuffer.toString("base64");

    fs.unlinkSync(imagePath);
    fs.unlinkSync(videoPath);

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    return res.json({
      success: true,
      videoUrl: `data:video/mp4;base64,${base64Video}`,
      creditBalance: user.creditBalance - 1,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default generateVideo;