import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import multer from "multer";

const router = express.Router();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File filter for image uploads
function fileFilter(req, file, cb) {
  if (!file || !file.originalname) {
    return cb(new Error("File is missing or invalid."), false);
  }

  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Image only!"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
});
const uploadSingleImage = upload.single("image");

// POST route for image upload
router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message || "Image upload failed" });
    }
    // Construct full URL for the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).send({
      message: "Image uploaded successfully",
      image: imageUrl,
    });
  });
});

// Serve static files in the "uploads" directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// GET route to retrieve an image by filename
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads", filename);

  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ message: "Image not found" });
    }
  });
});

export default router;
