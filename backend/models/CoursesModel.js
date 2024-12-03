    import mongoose from 'mongoose';

    const videoSchema = new mongoose.Schema({
        title: String,
        url: String, // URL/path to the video
        thumbnail:String,
        uploadedAt: {
        type: Date,
        default: Date.now
      }
    });
    const courseSchema = new mongoose.Schema({

        courseName: { 
            type: String, 
            required: true ,
            unique: true,
            trim: true,
        },
        description: { 
            type: String 
        },
        categoryId: { // changed from categoriesId to categoryId
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Category' 
        },
        imageUrl: { 
            type: String 
        } ,// URL to the course image
        domain: {
            type: [String],
            required: true, // Example: "dataScience", "webDevelopment", etc.
        },
        similarity: {
            type: Number,
            default: 0, // To track course similarity for recommendations
        },
        videos: [
            videoSchema
          ]
    },{timestamps:true});

    // Create and export the Course model
    const Course = mongoose.model('Course', courseSchema);
    export default Course;
