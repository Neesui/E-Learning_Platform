// controllers/mediaController.js
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const Video = require('../models/Video');
const Category = require('../models/Category');
const Course = require('../models/Course');

// Upload media to Cloudinary and save to different tables based on file type
const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        // Determine file type
        const fileType = req.file.mimetype.startsWith('image') ? 'image' : 'video';

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: fileType,
            folder: fileType === 'image' ? 'images' : 'videos'
        });

        // Delete local file after Cloudinary upload
        fs.unlinkSync(req.file.path);

        let savedMedia;
        if (fileType === 'video') {
            // Save video URL in Videos table
            const video = new Video({ videoUrl: result.secure_url });
            savedMedia = await video.save();
        } else {
            // Save image URL in Categories or Courses table based on request parameter
            if (req.body.type === 'category') {
                const category = new Category({ name: req.body.name, imageUrl: result.secure_url });
                savedMedia = await category.save();
            } else if (req.body.type === 'course') {
                const course = new Course({ title: req.body.title, description: req.body.description, imageUrl: result.secure_url });
                savedMedia = await course.save();
            } else {
                return res.status(400).json({ error: "Invalid media type specified" });
            }
        }

        res.status(200).json({
            message: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded and saved successfully`,
            data: savedMedia
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload media", details: error.message });
    }
};

module.exports = { uploadMedia };
