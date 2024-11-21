import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Configure storage for videos with destination and filename setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/videos/"); // Store in 'uploads/videos' directory
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File filter to allow only video files
function videoFileFilter(req, file, cb) {
  if (!file || !file.originalname) {
    return cb(new Error("File is missing or invalid."), false);
  }

  // Define acceptable video extensions and MIME types
  const filetypes = /mp4|avi|mov/;
  const mimetypes = /video\/mp4|video\/avi|video\/quicktime/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Videos only!"), false);
  }
}

// Set up multer with the storage and video file filter
const upload = multer({
  storage,
  fileFilter: videoFileFilter,
});

// Single video upload
const uploadSingleVideo = upload.single("video");

router.post("/", (req, res) => {
  uploadSingleVideo(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message || "Video upload failed" });
    }
    res.status(200).send({
      message: "Video uploaded successfully",
      videoPath: `${req.file.path}`,
    });
  });
});

export default router;