import { createError } from "../error.js";
import User from "../Models/User.js";
import Video from "../Models/Video.js";
import { getStorage } from "firebase-admin/storage";
import { v4 as uuidv4 } from "uuid";

export const addVideo = async (req, res, next) => {
  const { videoUrl, imgUrl, ...otherData } = req.body;

  // Generate public URLs
  const bucketname = "snooplay-a5644.appspot.com";
  const publicVideoUrl = await generatePublicUrl(videoUrl);
  const publicImgUrl = await generatePublicUrl(imgUrl);

  // Create new video document
  const newVideo = new Video({
    userId: req.user.id,
    videoUrl: publicVideoUrl,
    imgUrl: publicImgUrl,
    ...otherData,
  });

  const savedVideo = await newVideo.save();

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video"));
    }
  } catch (err) {
    next(err);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video hasbeen deleted");
    } else {
      return next(createError(403, "You can delete only your video"));
    }
  } catch (err) {
    next(err);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view hasbeen increased");
  } catch (err) {
    next(err);
  }
};
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const generatePublicUrl = async (fileUrl) => {
  try {
    // Extract file path from URL
    const bucket = getStorage().bucket("snooplay-a5644.appspot.com");
    const filePath = fileUrl.split(`${bucket.name}/`)[1]; // Extract relative path
    if (!filePath) throw new Error("Invalid file URL format");

    // const file = bucket.file(filePath);
    // const token = uuidv4();

    // await file.setMetadata({
    //   metadata: {
    //     firebaseStorageDownloadTokens: token,
    //   },
    // });

    // Construct public URL
    return `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filePath)}?alt=media`;
  } catch (error) {
    console.error("Error generating public URL:", error);
    return fileUrl;
  }
};
