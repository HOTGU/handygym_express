import mongoose from "mongoose";

const GalleryScehma = mongoose.Schema(
    {
        title: String,
        photos: [
            {
                photo: String,
                caption: String,
            },
        ],
        views: { type: Number, default: 0 },
        comments: [String],
        like_users: [String],
        creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Gallery = mongoose.model("Gallery", GalleryScehma);

export default Gallery;
